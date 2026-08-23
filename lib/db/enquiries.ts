'use server';

import { headers } from 'next/headers';
import { createAdminClient } from '../supabase/admin';
import { createClient } from '../supabase/server';
import { getCurrentUser } from '../auth/session';

export interface EnquiryResult {
  ok: boolean;
  /** Human-readable, spoken aloud on WhatsApp. e.g. TA-9F2C41BE */
  reference?: string;
  /** The private link path. No account needed to open it. */
  statusPath?: string;
  /** next-intl message key. Never a finished sentence -- copy lives in messages/. */
  errorKey?: string;
}

/**
 * Writes the enquiry BEFORE any human replies, so the booking reference matches
 * on both sides of the WhatsApp handoff.
 *
 * Uses the admin client deliberately. There is no browser write path to this
 * table at all -- see the migration of 2026-08-23. Everything a visitor is not
 * allowed to choose (reference, token, status, assignment, customer_id) is set
 * by database trigger, so a forged field in this form body is overwritten
 * rather than trusted.
 */
export async function createEnquiry(formData: FormData): Promise<EnquiryResult> {
  const contactName = String(formData.get('contactName') ?? '').trim();
  const contactPhone = String(formData.get('contactPhone') ?? '').trim();
  const contactEmail = String(formData.get('contactEmail') ?? '').trim();
  const message = String(formData.get('message') ?? '').trim();
  const packageSlug = String(formData.get('packageSlug') ?? '').trim();
  const locale = String(formData.get('locale') ?? 'ar');
  const partyAdults = Number(formData.get('partyAdults') ?? 2);
  const partyChildren = Number(formData.get('partyChildren') ?? 0);
  const preferredDeparture = String(formData.get('preferredDeparture') ?? '').trim();

  // Honeypot. A field a person never sees and a bot fills in. Answer success
  // so the bot does not learn it was caught, but write nothing.
  if (String(formData.get('company') ?? '')) {
    return { ok: true, reference: 'TA-000000', statusPath: '/' };
  }

  if (!contactName) return { ok: false, errorKey: 'enquiry.nameRequired' };
  if (contactName.length > 120) return { ok: false, errorKey: 'enquiry.nameTooLong' };
  if (!contactPhone && !contactEmail) return { ok: false, errorKey: 'enquiry.contactRequired' };
  if (contactEmail && !contactEmail.includes('@'))
    return { ok: false, errorKey: 'enquiry.emailInvalid' };
  if (message.length > 4000) return { ok: false, errorKey: 'enquiry.messageTooLong' };
  if (!Number.isInteger(partyAdults) || partyAdults < 1 || partyAdults > 12)
    return { ok: false, errorKey: 'enquiry.partyInvalid' };
  if (!Number.isInteger(partyChildren) || partyChildren < 0 || partyChildren > 12)
    return { ok: false, errorKey: 'enquiry.partyInvalid' };
  if (!['ar', 'en', 'fr'].includes(locale)) return { ok: false, errorKey: 'enquiry.localeInvalid' };

  if (!(await withinRateLimit())) return { ok: false, errorKey: 'enquiry.tooManyAttempts' };

  const admin = createAdminClient();

  // The admin client has no user session, so auth.uid() is NULL inside the
  // stamp_new_enquiry trigger. The signed-in customer has to be supplied here or
  // the enquiry is never linked to their account and "my enquiries" stays empty.
  // getCurrentUser() verifies the session against the auth server, so this is a
  // checked identity rather than a value taken from the form body.
  const signedInCustomer = await getCurrentUser();

  let packageId: string | null = null;
  if (packageSlug) {
    const { data } = await admin.from('packages').select('id').eq('slug', packageSlug).maybeSingle();
    packageId = data?.id ?? null;
  }

  // Attribution is captured HERE, server-side, on the request itself. WebKit
  // caps JavaScript-written cookies at 24 hours the moment it detects link
  // decoration -- which is exactly what a UTM-tagged Instagram link is -- so
  // client-side attribution produces a dashboard full of "direct".
  const h = await headers();
  const referrer = h.get('referer');

  const { data, error } = await admin
    .from('enquiries')
    .insert({
      // reference and access_token are required by the generated types but are
      // overwritten by the stamp_new_enquiry trigger. Placeholders only.
      reference: 'pending',
      access_token: 'pending',
      package_id: packageId,
      customer_id: signedInCustomer?.id ?? null,
      contact_name: contactName,
      contact_phone: contactPhone || null,
      contact_email: contactEmail || null,
      party_adults: partyAdults,
      party_children: partyChildren,
      preferred_departure: preferredDeparture || null,
      message: message || null,
      locale,
      market: marketFor(contactPhone),
      utm_source: emptyToNull(formData.get('utmSource')),
      utm_medium: emptyToNull(formData.get('utmMedium')),
      utm_campaign: emptyToNull(formData.get('utmCampaign')),
      referrer,
    })
    .select('reference, access_token')
    .single();

  if (error) {
    // Never leak a database message to a visitor.
    console.error('createEnquiry failed:', error.message);
    return { ok: false, errorKey: 'enquiry.failed' };
  }

  return {
    ok: true,
    reference: data.reference,
    statusPath: `/${locale}/q/${data.access_token}`,
  };
}

/** A signed-in customer's own enquiries. RLS returns nobody else's. */
export async function getMyEnquiries() {
  const user = await getCurrentUser();
  if (!user) return [];

  const supabase = await createClient();
  const { data, error } = await supabase
    .from('enquiries')
    .select('reference, status, received_at, party_adults, party_children, preferred_departure, packages ( slug )')
    .order('received_at', { ascending: false });

  if (error) throw new Error(`getMyEnquiries: ${error.message}`);
  return data ?? [];
}

/**
 * The account-free journey. Backed by a security-definer function that returns
 * a deliberately narrow shape: no assignment, no internal notes, no contact
 * details beyond the name, and never the token itself.
 */
export async function getEnquiryByToken(token: string) {
  if (!token || token.length < 32) return null;

  const supabase = await createClient();
  const { data, error } = await supabase.rpc('enquiry_by_token', { p_token: token });

  if (error) throw new Error(`getEnquiryByToken: ${error.message}`);
  return data?.[0] ?? null;
}

/* ----------------------------------------------------------------- helpers */

const emptyToNull = (v: FormDataEntryValue | null): string | null => {
  const s = String(v ?? '').trim();
  return s === '' ? null : s;
};

/** Coarse market bucket from the dialling code, for reporting only. */
function marketFor(phone: string): 'gcc' | 'levant_egypt' | 'north_africa' | 'other' | null {
  const p = phone.replace(/[^\d+]/g, '');
  if (!p.startsWith('+')) return null;
  if (/^\+(966|971|965|974|973|968)/.test(p)) return 'gcc';
  if (/^\+(20|961|962|963|964|970|972)/.test(p)) return 'levant_egypt';
  if (/^\+(216|212|213|218)/.test(p)) return 'north_africa';
  return 'other';
}

/**
 * Coarse in-process rate limit.
 *
 * HONEST LIMITATION: this Map lives in one server instance. On Vercel's Fluid
 * Compute, instances are reused but not shared, so a determined flood spread
 * across cold starts gets through. It stops casual double-submits and simple
 * scripts, which is most of the real traffic. If enquiry volume ever justifies
 * it, move this to Upstash Redis -- do not pretend the Map is sufficient then.
 */
const attempts = new Map<string, { count: number; windowStart: number }>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

async function withinRateLimit(): Promise<boolean> {
  const h = await headers();
  const ip = h.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  const now = Date.now();
  const rec = attempts.get(ip);

  if (!rec || now - rec.windowStart > WINDOW_MS) {
    attempts.set(ip, { count: 1, windowStart: now });
    return true;
  }
  if (rec.count >= MAX_PER_WINDOW) return false;
  rec.count += 1;
  return true;
}
