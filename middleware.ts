import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const hasAuthCookie = request.cookies.has('admin-auth');
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    if (!hasAuthCookie) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  if (pathname === '/admin/login' && hasAuthCookie) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
}
