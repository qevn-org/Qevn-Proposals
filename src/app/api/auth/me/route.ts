import { NextRequest, NextResponse } from 'next/server';
import { verifySignedToken } from '@/lib/server-auth';

export async function GET(req: NextRequest) {
  try {
    const sessionCookie = req.cookies.get('qevn_session')?.value;

    if (!sessionCookie) {
      return NextResponse.json({ authenticated: false, user: null }, { status: 401 });
    }

    const user = verifySignedToken(sessionCookie);

    if (!user) {
      return NextResponse.json({ authenticated: false, user: null }, { status: 401 });
    }

    return NextResponse.json({ authenticated: true, user });
  } catch {
    return NextResponse.json({ authenticated: false, user: null }, { status: 500 });
  }
}
