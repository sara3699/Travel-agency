import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * The card builder's work list. Read-only, published rows only.
 *
 * Each entry carries `updatedAt` so the builder can stamp a manifest with the
 * exact revision each card was cut from. The admin then compares that stamp to
 * the live row, which answers "is this card stale" exactly rather than by
 * comparing timestamps across two clocks.
 */
export async function GET() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('packages')
    .select('slug, updated_at')
    .eq('status', 'published')
    .order('slug');

  return NextResponse.json(
    (data ?? []).map((p) => ({ slug: p.slug, updatedAt: p.updated_at })),
  );
}
