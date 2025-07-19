import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hasAuthCookie = request.cookies.has('admin-auth');
  const { pathname } = request.nextUrl;

  // Protect admin dashboard
  if (pathname.startsWith('/admin/dashboard') && !hasAuthCookie) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // Redirect logged-in admin from login page to dashboard
  if (pathname.startsWith('/admin/login') && hasAuthCookie) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/login', '/admin/dashboard'],
};