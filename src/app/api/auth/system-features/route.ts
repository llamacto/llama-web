import { NextResponse } from 'next/server';
import { getUpstreamBaseUrl } from '../../_lib/upstream';

export async function GET() {
  const baseUrl = getUpstreamBaseUrl();

  const res = await fetch(`${baseUrl}/console/api/system-features`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
    cache: 'no-store',
  });

  const payload = await res.json().catch(() => null);
  if (!res.ok) {
    return NextResponse.json(payload ?? { message: 'Failed to fetch system features' }, { status: res.status });
  }

  return NextResponse.json({ data: payload?.data ?? payload }, { status: 200 });
}
