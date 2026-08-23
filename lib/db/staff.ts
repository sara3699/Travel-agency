'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '../supabase/server';
import { requireStaff } from '../auth/session';

/**
 * The employee's working surface. Every function here uses the SESSION client,
 * never the admin client, so the policies apply: an employee who tries to
 * assign work to a colleague is refused by the database, not by a hidden
 * button.
 */

export async function getEnquiryQueue() {
  await requireStaff();
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('enquiries')
    .select(`
      id, reference, status, contact_name, contact_phone, contact_email,
      party_adults, party_children, preferred_departure, message, locale, market,
      received_at, first_response_at, assigned_to,
      packages ( slug )
    `)
    .is('archived_at', null)
    .order('received_at', { ascending: true });

  if (error) throw new Error(`getEnquiryQueue: ${error.message}`);
  return data ?? [];
}

/**
 * Take an enquiry. An employee may only take it for themselves -- the policy's
 * WITH CHECK enforces that, so passing someone else's id fails at the database.
 * An admin may hand it to anyone.
 */
export async function claimEnquiry(enquiryId: string, assignTo?: string) {
  const me = await requireStaff();
  const supabase = await createClient();

  const { error } = await supabase
    .from('enquiries')
    .update({ assigned_to: assignTo ?? me.id, status: 'assigned' })
    .eq('id', enquiryId);

  if (error) return { ok: false, errorKey: 'staff.assignRefused' };
  revalidatePath('/', 'layout');
  return { ok: true };
}

/**
 * Marks the enquiry answered. Does NOT take a timestamp argument on purpose:
 * first_response_at is stamped by a database trigger, so the response-time
 * median cannot be edited by the person it measures.
 */
export async function markResponded(enquiryId: string) {
  await requireStaff();
  const supabase = await createClient();

  const { error } = await supabase
    .from('enquiries')
    .update({ status: 'responded' })
    .eq('id', enquiryId);

  if (error) return { ok: false, errorKey: 'staff.updateFailed' };
  revalidatePath('/', 'layout');
  return { ok: true };
}

export type StaffStatus = 'assigned' | 'responded' | 'quoted' | 'won' | 'lost' | 'archived';

export async function setEnquiryStatus(enquiryId: string, status: StaffStatus) {
  await requireStaff();
  const supabase = await createClient();

  const { error } = await supabase.from('enquiries').update({ status }).eq('id', enquiryId);

  if (error) return { ok: false, errorKey: 'staff.updateFailed' };
  revalidatePath('/', 'layout');
  return { ok: true };
}

/**
 * Internal note. Invisible to the customer permanently -- enquiry_notes has no
 * customer-facing policy at all. author_id must be the caller; the policy
 * refuses a forged author.
 */
export async function addNote(enquiryId: string, body: string) {
  const me = await requireStaff();
  const trimmed = body.trim();
  if (!trimmed) return { ok: false, errorKey: 'staff.noteEmpty' };

  const supabase = await createClient();
  const { error } = await supabase
    .from('enquiry_notes')
    .insert({ enquiry_id: enquiryId, author_id: me.id, body: trimmed });

  if (error) return { ok: false, errorKey: 'staff.noteFailed' };
  revalidatePath('/', 'layout');
  return { ok: true };
}

export async function getNotes(enquiryId: string) {
  await requireStaff();
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('enquiry_notes')
    .select('id, body, created_at, author_id, profiles:author_id ( display_name )')
    .eq('enquiry_id', enquiryId)
    .order('created_at', { ascending: true });

  if (error) throw new Error(`getNotes: ${error.message}`);
  return data ?? [];
}

/**
 * The private response-time figures.
 *
 * An employee sees only their own; an admin sees everyone's. This is the
 * decision of 2026-08-22: the site publishes a window it can keep at its worst
 * hour, and measures the median privately. Do not render this on a public page.
 */
export async function getResponseTimes() {
  const me = await requireStaff();
  const supabase = await createClient();

  let query = supabase
    .from('enquiries')
    .select('received_at, first_response_at, assigned_to')
    .not('first_response_at', 'is', null);

  if (me.role !== 'admin') query = query.eq('assigned_to', me.id);

  const { data, error } = await query;
  if (error) throw new Error(`getResponseTimes: ${error.message}`);

  const minutes = (data ?? [])
    .map((r) =>
      (new Date(r.first_response_at as string).getTime() - new Date(r.received_at).getTime()) / 60000,
    )
    .filter((n) => Number.isFinite(n) && n >= 0)
    .sort((a, b) => a - b);

  if (minutes.length === 0) return { count: 0, medianMinutes: null, worstMinutes: null };

  const mid = Math.floor(minutes.length / 2);
  const median =
    minutes.length % 2 === 0 ? (minutes[mid - 1] + minutes[mid]) / 2 : minutes[mid];

  return {
    count: minutes.length,
    medianMinutes: Math.round(median),
    worstMinutes: Math.round(minutes[minutes.length - 1]),
  };
}
