import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const ACCESS_TOKEN_COOKIE = 'scaffold_access_token';
export const REFRESH_TOKEN_COOKIE = 'scaffold_refresh_token';

export function getUpstreamBaseUrl(): string {
  const base = process.env.UPSTREAM_API_BASE || '';

  if (!base) {
    throw new Error('UPSTREAM_API_BASE is not configured');
  }

  return base.replace(/\/$/, '');
}

export async function getAccessTokenFromCookies(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(ACCESS_TOKEN_COOKIE)?.value ?? null;
}

export function clearAuthCookies(res: NextResponse): void {
  res.cookies.set(ACCESS_TOKEN_COOKIE, '', { path: '/', maxAge: 0 });
  res.cookies.set(REFRESH_TOKEN_COOKIE, '', { path: '/', maxAge: 0 });
}

export function setAuthCookies(
  res: NextResponse,
  tokens: { access_token: string; refresh_token?: string },
  remember: boolean
): void {
  const maxAge = remember ? 60 * 60 * 24 * 30 : 60 * 60 * 24;

  const common = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge,
  };

  res.cookies.set(ACCESS_TOKEN_COOKIE, tokens.access_token, common);

  if (tokens.refresh_token) {
    res.cookies.set(REFRESH_TOKEN_COOKIE, tokens.refresh_token, common);
  }
}
