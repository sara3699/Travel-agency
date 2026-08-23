'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { signIn, signUp, signOut } from '@/lib/auth/actions';
import { createEnquiry, type EnquiryResult } from '@/lib/db/enquiries';
import {
  claimEnquiry,
  markResponded,
  setEnquiryStatus,
  addNote,
  type StaffStatus,
} from '@/lib/db/staff';
import { createEmployee, revokeStaffRole, revokeSessions } from '@/lib/db/admin-users';

/**
 * Adapters between the backend's `(formData) => Result` shape and the
 * `(prevState, formData) => Result` shape React's useActionState wants.
 *
 * They exist so no component has to invent its own error handling, and so the
 * only thing that ever crosses to the client is a message KEY. A finished
 * sentence from the server would be untranslated, and this app is Arabic-first.
 */

export interface FormState {
  ok: boolean | null;
  errorKey?: string;
}

/* ------------------------------------------------------------------ auth */

export async function signInAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const res = await signIn(formData);
  if (!res.ok) return { ok: false, errorKey: res.errorKey };
  // redirect() throws a control-flow signal, so it must be the last thing here.
  redirect(`/${localeOf(formData)}/account`);
}

export async function signUpAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const res = await signUp(formData);
  if (!res.ok) return { ok: false, errorKey: res.errorKey };
  redirect(`/${localeOf(formData)}/account`);
}

export async function signOutAction(formData: FormData): Promise<void> {
  await signOut();
  redirect(`/${localeOf(formData)}`);
}

/* --------------------------------------------------------------- enquiry */

export interface EnquiryState extends FormState {
  reference?: string;
  statusPath?: string;
}

export async function enquiryAction(
  _prev: EnquiryState,
  formData: FormData,
): Promise<EnquiryState> {
  const res: EnquiryResult = await createEnquiry(formData);
  if (!res.ok) return { ok: false, errorKey: res.errorKey };
  return { ok: true, reference: res.reference, statusPath: res.statusPath };
}

/* ----------------------------------------------------------------- staff */

export async function claimAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const id = String(formData.get('enquiryId') ?? '');
  const assignTo = String(formData.get('assignTo') ?? '') || undefined;
  const res = await claimEnquiry(id, assignTo);
  revalidatePath(`/${localeOf(formData)}/staff`);
  return res.ok ? { ok: true } : { ok: false, errorKey: res.errorKey };
}

export async function respondedAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const res = await markResponded(String(formData.get('enquiryId') ?? ''));
  revalidatePath(`/${localeOf(formData)}/staff`);
  return res.ok ? { ok: true } : { ok: false, errorKey: res.errorKey };
}

export async function statusAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const res = await setEnquiryStatus(
    String(formData.get('enquiryId') ?? ''),
    String(formData.get('status') ?? '') as StaffStatus,
  );
  revalidatePath(`/${localeOf(formData)}/staff`);
  return res.ok ? { ok: true } : { ok: false, errorKey: res.errorKey };
}

export async function noteAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const res = await addNote(
    String(formData.get('enquiryId') ?? ''),
    String(formData.get('body') ?? ''),
  );
  revalidatePath(`/${localeOf(formData)}/staff`);
  return res.ok ? { ok: true } : { ok: false, errorKey: res.errorKey };
}

/* ----------------------------------------------------------------- admin */

export async function createEmployeeAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const res = await createEmployee(formData);
  revalidatePath(`/${localeOf(formData)}/admin`);
  return res.ok ? { ok: true } : { ok: false, errorKey: res.errorKey };
}

export async function revokeRoleAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const res = await revokeStaffRole(
    String(formData.get('userId') ?? ''),
    String(formData.get('role') ?? '') as 'admin' | 'employee',
  );
  revalidatePath(`/${localeOf(formData)}/admin`);
  return res.ok ? { ok: true } : { ok: false, errorKey: res.errorKey };
}

export async function revokeSessionsAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const res = await revokeSessions(String(formData.get('userId') ?? ''));
  revalidatePath(`/${localeOf(formData)}/admin`);
  return res.ok ? { ok: true } : { ok: false, errorKey: res.errorKey };
}

/* --------------------------------------------------------------- helpers */

/** The locale rides in a hidden field so a redirect never drops the visitor
 *  into the default language. Validated against the allow-list rather than
 *  trusted, because it is form input and it lands in a URL. */
function localeOf(formData: FormData): string {
  const l = String(formData.get('locale') ?? 'en');
  return ['ar', 'en', 'fr'].includes(l) ? l : 'en';
}
