import { NextResponse } from 'next/server';
import { getAccessTokenFromCookies, getUpstreamBaseUrl } from '../../_lib/upstream';

export async function GET() {
  const token = await getAccessTokenFromCookies();
  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const baseUrl = getUpstreamBaseUrl();
  const profileRes = await fetch(`${baseUrl}/console/api/account-ex/profile`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  });

  const payload = await profileRes.json().catch(() => null);
  if (!profileRes.ok) {
    return NextResponse.json(payload ?? { message: 'Unauthorized' }, { status: profileRes.status });
  }

  const user = payload?.data ?? payload;
  return NextResponse.json({ data: { user } }, { status: 200 });
}
