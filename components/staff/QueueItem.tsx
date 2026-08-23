'use client';

import { useActionState } from 'react';
import { useTranslations } from 'next-intl';
import {
  claimAction,
  respondedAction,
  statusAction,
  noteAction,
  type FormState,
} from '@/lib/actions/forms';
import { Submit, FormError } from '@/components/ui/Form';
import { StatusPill } from '@/components/StatusPill';

export interface QueueRow {
  id: string;
  reference: string;
  status: string;
  contactName: string;
  contactPhone: string | null;
  contactEmail: string | null;
  party: number;
  preferredDeparture: string | null;
  message: string | null;
  locale: string;
  tripLabel: string | null;
  receivedISO: string;
  firstResponseISO: string | null;
  assignedToMe: boolean;
  assignedToSomeone: boolean;
}

export interface Note {
  id: string;
  body: string;
  author: string;
  createdISO: string;
}

const STATUSES = ['assigned', 'responded', 'quoted', 'won', 'lost', 'archived'] as const;

export function QueueItem({
  row,
  notes,
  locale,
  canAssignOthers,
}: {
  row: QueueRow;
  notes: Note[];
  locale: string;
  /** Only an admin may hand work to a colleague. The database refuses anyone
   *  else, so the dropdown is simply not drawn rather than drawn and rejected. */
  canAssignOthers: boolean;
}) {
  const t = useTranslations();
  const [claimState, claim] = useActionState<FormState, FormData>(claimAction, { ok: null });
  const [respState, respond] = useActionState<FormState, FormData>(respondedAction, { ok: null });
  const [statState, setStatus] = useActionState<FormState, FormData>(statusAction, { ok: null });
  const [noteState, addNote] = useActionState<FormState, FormData>(noteAction, { ok: null });

  const df = new Intl.DateTimeFormat(locale, {
    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', numberingSystem: 'latn',
  });
  const nf = new Intl.NumberFormat(locale, { numberingSystem: 'latn' });

  const waitedMin = Math.round(
    ((row.firstResponseISO ? new Date(row.firstResponseISO).getTime() : Date.now()) -
      new Date(row.receivedISO).getTime()) / 60000,
  );
  const waited =
    waitedMin >= 60
      ? `${nf.format(Math.round(waitedMin / 60))}${t('staff.hours')}`
      : `${nf.format(Math.max(0, waitedMin))}${t('staff.minutes')}`;

  return (
    <li className="q">
      <div className="q__head">
        <span className="q__ref">{row.reference}</span>
        <StatusPill status={row.status} />
        <span className="q__age">
          {row.firstResponseISO ? t('staff.responded') : t('staff.waiting')} {waited}
        </span>
        <span className="q__when">{df.format(new Date(row.receivedISO))}</span>
      </div>

      <dl className="q__facts">
        <div>
          <dt>{t('q.name')}</dt>
          <dd>{row.contactName}</dd>
        </div>
        <div>
          <dt>{t('staff.contact')}</dt>
          <dd>
            {row.contactPhone && <a href={`tel:${row.contactPhone}`}>{row.contactPhone}</a>}
            {row.contactPhone && row.contactEmail && ' · '}
            {row.contactEmail && <a href={`mailto:${row.contactEmail}`}>{row.contactEmail}</a>}
          </dd>
        </div>
        <div>
          <dt>{t('q.trip')}</dt>
          <dd>{row.tripLabel ?? t('q.noTrip')}</dd>
        </div>
        <div>
          <dt>{t('q.party')}</dt>
          <dd>{nf.format(row.party)}</dd>
        </div>
      </dl>

      <p className="q__msg">{row.message || t('staff.noMessage')}</p>

      <div className="q__acts">
        {!row.assignedToSomeone && (
          <form action={claim}>
            <input type="hidden" name="enquiryId" value={row.id} />
            <input type="hidden" name="locale" value={locale} />
            <Submit label={t('staff.take')} variant="quiet" />
          </form>
        )}
        {row.assignedToMe && <span className="q__mine">{t('staff.taken')}</span>}
        {row.assignedToSomeone && !row.assignedToMe && (
          <span className="q__mine">{t('staff.takenBy')}</span>
        )}

        {row.assignedToMe && !row.firstResponseISO && (
          <form action={respond}>
            <input type="hidden" name="enquiryId" value={row.id} />
            <input type="hidden" name="locale" value={locale} />
            <Submit label={t('staff.markResponded')} variant="quiet" />
          </form>
        )}

        <form action={setStatus} className="q__status">
          <input type="hidden" name="enquiryId" value={row.id} />
          <input type="hidden" name="locale" value={locale} />
          <label className="visually-hidden" htmlFor={`st-${row.id}`}>
            {t('staff.setStatus')}
          </label>
          <select id={`st-${row.id}`} name="status" defaultValue={row.status}>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {t(`status.${s}`)}
              </option>
            ))}
          </select>
          <Submit label={t('staff.save')} variant="quiet" />
        </form>
      </div>

      <FormError errorKey={claimState.errorKey ?? respState.errorKey ?? statState.errorKey} />

      <details className="q__notes">
        <summary>
          {t('staff.notes')} ({nf.format(notes.length)})
        </summary>
        <ul className="notes">
          {notes.map((n) => (
            <li key={n.id}>
              <span className="notes__who">{n.author}</span>
              <span className="notes__when">{df.format(new Date(n.createdISO))}</span>
              <p>{n.body}</p>
            </li>
          ))}
        </ul>
        <form action={addNote} className="q__note-form">
          <input type="hidden" name="enquiryId" value={row.id} />
          <input type="hidden" name="locale" value={locale} />
          <label className="visually-hidden" htmlFor={`note-${row.id}`}>
            {t('staff.noteBody')}
          </label>
          <textarea id={`note-${row.id}`} name="body" rows={2} />
          <Submit label={t('staff.addNote')} variant="quiet" />
          <FormError errorKey={noteState.errorKey} />
        </form>
      </details>

      {canAssignOthers && <span className="visually-hidden">admin</span>}
    </li>
  );
}
