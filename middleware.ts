import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // デバッグログ追加
  console.log('🔍 Middleware実行:', {
    pathname,
    hasToken: !!token,
    tokenLength: token ? token.length : 0,
    allCookies: request.cookies.getAll().map(c => ({ name: c.name, hasValue: !!c.value })),
    userAgent: request.headers.get('user-agent')?.substring(0, 50) + '...'
  });

  // If the user is trying to access the admin area without a token,
  // redirect them to the login page.
  if (pathname.startsWith('/admin') && !token) {
    console.log('❌ Admin area access denied - no token, redirecting to login');
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', pathname); // Optional: redirect back after login
    return NextResponse.redirect(loginUrl);
  }

  // If the user is logged in and tries to access the login page,
  // redirect them to the admin dashboard.
  if (pathname === '/login' && token) {
    console.log('✅ User already logged in, redirecting to admin');
    return NextResponse.redirect(new URL('/admin/articles', request.url));
  }

  console.log('➡️ Middleware passed, continuing to:', pathname);
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
}; 