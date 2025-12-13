import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const ACCESS_TOKEN_COOKIE = 'llama_web_access_token';
export const REFRESH_TOKEN_COOKIE = 'llama_web_refresh_token';

const LEGACY_ACCESS_TOKEN_COOKIE = 'zgi_access_token';
const LEGACY_REFRESH_TOKEN_COOKIE = 'zgi_refresh_token';

export function getUpstreamBaseUrl(): string {
  const base =
    process.env.UPSTREAM_API_BASE ||
    process.env.ZGI_API_BASE ||
    process.env.NEXT_PUBLIC_UPSTREAM_API_BASE ||
    process.env.NEXT_PUBLIC_ZGI_API_BASE ||
    '';

  if (!base) {
    throw new Error('UPSTREAM_API_BASE is not configured');
  }

  return base.replace(/\/$/, '');
}

export async function getAccessTokenFromCookies(): Promise<string | null> {
  const cookieStore = await cookies();
  return (
    cookieStore.get(ACCESS_TOKEN_COOKIE)?.value ??
    cookieStore.get(LEGACY_ACCESS_TOKEN_COOKIE)?.value ??
    null
  );
}

export function clearAuthCookies(res: NextResponse): void {
  res.cookies.set(ACCESS_TOKEN_COOKIE, '', { path: '/', maxAge: 0 });
  res.cookies.set(REFRESH_TOKEN_COOKIE, '', { path: '/', maxAge: 0 });

  // Clear legacy cookies for backwards compatibility.
  res.cookies.set(LEGACY_ACCESS_TOKEN_COOKIE, '', { path: '/', maxAge: 0 });
  res.cookies.set(LEGACY_REFRESH_TOKEN_COOKIE, '', { path: '/', maxAge: 0 });
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
  res.cookies.set(LEGACY_ACCESS_TOKEN_COOKIE, tokens.access_token, common);

  if (tokens.refresh_token) {
    res.cookies.set(REFRESH_TOKEN_COOKIE, tokens.refresh_token, common);
    res.cookies.set(LEGACY_REFRESH_TOKEN_COOKIE, tokens.refresh_token, common);
  }
}
