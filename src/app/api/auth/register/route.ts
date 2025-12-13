import { NextRequest, NextResponse } from 'next/server';
import { getUpstreamBaseUrl } from '../../_lib/upstream';

interface RegisterBody {
  email: string;
  name: string;
  password: string;
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as RegisterBody;

  if (!body?.email || !body?.name || !body?.password) {
    return NextResponse.json({ message: 'Email, name, and password are required' }, { status: 400 });
  }

  const baseUrl = getUpstreamBaseUrl();

  const res = await fetch(`${baseUrl}/console/api/account/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      email: body.email,
      name: body.name,
      password: body.password,
    }),
    cache: 'no-store',
  });

  const payload = await res.json().catch(() => null);
  if (!res.ok) {
    return NextResponse.json(payload ?? { message: 'Registration failed' }, { status: res.status });
  }

  return NextResponse.json({ data: payload?.data ?? payload }, { status: 200 });
}
