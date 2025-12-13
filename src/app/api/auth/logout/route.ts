import { NextResponse } from 'next/server';
import { clearAuthCookies, getAccessTokenFromCookies, getUpstreamBaseUrl } from '../../_lib/upstream';

export async function POST() {
  const baseUrl = getUpstreamBaseUrl();
  const token = await getAccessTokenFromCookies();

  try {
    if (token) {
      await fetch(`${baseUrl}/console/api/logout`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({}),
        cache: 'no-store',
      });
    }
  } finally {
    const res = NextResponse.json({ data: { ok: true } }, { status: 200 });
    clearAuthCookies(res);
    return res;
  }
}
