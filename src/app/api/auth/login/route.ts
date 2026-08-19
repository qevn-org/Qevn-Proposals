import { NextRequest, NextResponse } from 'next/server';
import { verifyCredentials, createSignedToken } from '@/lib/server-auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    // Authenticate strictly against the 4 authorized users on the server
    const user = verifyCredentials(email, password);

    if (!user) {
      // Intentionally generic error message to prevent enumeration attacks
      return NextResponse.json(
        { error: 'Invalid credentials. Access restricted to authorized team members.' },
        { status: 401 }
      );
    }

    // Generate cryptographically signed token
    const token = createSignedToken(user);

    const response = NextResponse.json({
      success: true,
      user
    });

    // Set secure HttpOnly cookie (inaccessible via JavaScript / XSS)
    response.cookies.set({
      name: 'qevn_session',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });

    return response;
  } catch (err) {
    return NextResponse.json(
      { error: 'Internal server error during authentication.' },
      { status: 500 }
    );
  }
}
