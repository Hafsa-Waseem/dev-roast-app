import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const adminToken = request.cookies.get('admin_token');
  const adminSecret = process.env.ADMIN_SECRET_KEY;

  // If the user is trying to access the login page, let them through immediately.
  // This is the first check to prevent redirection loops.
  if (request.nextUrl.pathname.startsWith('/admin/login')) {
    return NextResponse.next();
  }

  // If there's no secret key set in the environment, allow access to all admin pages.
  // This is for ease of development but insecure for production.
  // The login action itself will prevent login if the key is not set.
  if (!adminSecret) {
    return NextResponse.next();
  }

  // For any other admin route, check for the token.
  // If the token is missing or invalid, redirect to the login page.
  if (!adminToken || adminToken.value !== adminSecret) {
    const loginUrl = new URL('/admin/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // If the token is valid, allow the request to proceed.
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/admin/:path*',
}
