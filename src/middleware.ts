import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // If the request is not for an admin route, do nothing.
  if (!pathname.startsWith('/admin')) {
    return NextResponse.next()
  }

  // Allow requests to the login page to proceed without checks to prevent a redirect loop.
  if (pathname === '/admin/login') {
    return NextResponse.next()
  }

  const adminToken = request.cookies.get('admin_token');
  const adminSecret = process.env.ADMIN_SECRET_KEY;

  // If there's no secret key set in the environment, allow access for development.
  // The login action itself will prevent login, but this stops the middleware from redirecting.
  if (!adminSecret) {
    return NextResponse.next();
  }

  // If the token is missing or invalid, redirect to the login page.
  if (!adminToken || adminToken.value !== adminSecret) {
    const loginUrl = new URL('/admin/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  // If the token is valid, allow the request to proceed.
  return NextResponse.next()
}

// Apply this middleware to all paths.
// The logic inside the function will filter for /admin routes.
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
