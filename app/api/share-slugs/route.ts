import { NextResponse } from 'next/server';
import { getPublishedPackages } from '@/lib/db/packages';

/** Slugs for the card builder. Read-only, published rows only. */
export async function GET() {
  const all = await getPublishedPackages();
  return NextResponse.json(all.map((p) => p.slug));
}
