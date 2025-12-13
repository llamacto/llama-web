import { NextRequest, NextResponse } from 'next/server';
import { getAccessTokenFromCookies, getUpstreamBaseUrl } from '../../_lib/upstream';

async function proxy(req: NextRequest) {
  const baseUrl = getUpstreamBaseUrl();
  const token = await getAccessTokenFromCookies();

  const url = new URL(req.url);
  const segments = url.pathname.split('/api/zgi/')[1] ?? '';
  const targetUrl = `${baseUrl}/${segments}${url.search}`;

  const headers = new Headers(req.headers);
  headers.delete('host');
  headers.delete('cookie');
  headers.delete('content-length');

  if (token) {
    headers.set('authorization', `Bearer ${token}`);
  }

  const method = req.method.toUpperCase();
  const shouldHaveBody = !['GET', 'HEAD'].includes(method);

  const requestBody = shouldHaveBody ? await req.arrayBuffer() : undefined;

  const upstreamRes = await fetch(targetUrl, {
    method,
    headers,
    body: requestBody,
    cache: 'no-store',
  });

  const resHeaders = new Headers(upstreamRes.headers);
  resHeaders.delete('set-cookie');
  resHeaders.delete('content-encoding');
  resHeaders.delete('content-length');

  const resBody = await upstreamRes.arrayBuffer();

  return new NextResponse(resBody, {
    status: upstreamRes.status,
    headers: resHeaders,
  });
}

export async function GET(req: NextRequest) {
  return proxy(req);
}

export async function POST(req: NextRequest) {
  return proxy(req);
}

export async function PUT(req: NextRequest) {
  return proxy(req);
}

export async function PATCH(req: NextRequest) {
  return proxy(req);
}

export async function DELETE(req: NextRequest) {
  return proxy(req);
}
