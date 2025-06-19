import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const response = NextResponse.json({ message: 'Logout successful' }, { status: 200 });

    // Clear the 'token' cookie by setting its Max-Age to 0
    response.cookies.set({
      name: 'token',
      value: '',
      httpOnly: true,
      path: '/',
      maxAge: 0,
      sameSite: 'strict',
      // In production, also set 'secure: true'
      // secure: process.env.NODE_ENV === 'production',
    });

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ message: 'An error occurred during logout' }, { status: 500 });
  }
} 