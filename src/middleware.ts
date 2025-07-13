import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const adminToken = request.cookies.get('admin_token');
  const adminSecret = process.env.ADMIN_SECRET_KEY;

  const { pathname } = request.nextUrl;

  // Allow requests to the login page to proceed without checks.
  // This prevents a redirect loop.
  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  // If there's no secret key set in the environment, allow access to all admin pages.
  // This is for ease of development. The login action itself will prevent login.
  if (!adminSecret) {
    return NextResponse.next();
  }

  // For any other admin route, check for a valid token.
  // If the token is missing or invalid, redirect to the login page.
  if (!adminToken || adminToken.value !== adminSecret) {
    const loginUrl = new URL('/admin/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // If the token is valid, allow the request to proceed.
  return NextResponse.next();
}

// Apply this middleware to all paths under /admin/, except for the login page itself.
export const config = {
  matcher: '/admin/:path*',
}
