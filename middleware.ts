import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // If the user is trying to access the admin area without a token,
  // redirect them to the login page.
  if (pathname.startsWith('/admin') && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', pathname); // Optional: redirect back after login
    return NextResponse.redirect(loginUrl);
  }

  // If the user is logged in and tries to access the login page,
  // redirect them to the admin dashboard.
  if (pathname === '/login' && token) {
    return NextResponse.redirect(new URL('/admin/articles', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
}; 