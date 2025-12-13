import { NextRequest, NextResponse } from 'next/server';
import { getUpstreamBaseUrl, setAuthCookies } from '../../_lib/upstream';

interface LoginBody {
  email: string;
  password: string;
  remember?: boolean;
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as LoginBody;

  if (!body?.email || !body?.password) {
    return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
  }

  const baseUrl = getUpstreamBaseUrl();

  const loginRes = await fetch(`${baseUrl}/console/api/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      email: body.email,
      password: body.password,
    }),
    cache: 'no-store',
  });

  const loginPayload = await loginRes.json().catch(() => null);
  if (!loginRes.ok) {
    return NextResponse.json(loginPayload ?? { message: 'Login failed' }, { status: loginRes.status });
  }

  const accessToken = loginPayload?.data?.access_token as string | undefined;
  const refreshToken = loginPayload?.data?.refresh_token as string | undefined;

  if (!accessToken) {
    return NextResponse.json({ message: 'Login failed: invalid response format' }, { status: 502 });
  }

  const profileRes = await fetch(`${baseUrl}/console/api/account-ex/profile`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    cache: 'no-store',
  });

  const profilePayload = await profileRes.json().catch(() => null);
  if (!profileRes.ok) {
    return NextResponse.json(profilePayload ?? { message: 'Failed to fetch profile' }, { status: profileRes.status });
  }

  const user = profilePayload?.data ?? profilePayload;

  const res = NextResponse.json({ data: { user } }, { status: 200 });
  setAuthCookies(res, { access_token: accessToken, refresh_token: refreshToken }, Boolean(body.remember));

  return res;
}
