import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromCookies, destroySession } from '@/lib/auth/session';

export async function POST(request: NextRequest) {
  try {
    const session = await getSessionFromCookies();
    destroySession(session);
    await session.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Logout API error:', error);

    return NextResponse.json(
      { success: false, error: 'An error occurred during logout' },
      { status: 500 }
    );
  }
}

// Disallow other HTTP methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
