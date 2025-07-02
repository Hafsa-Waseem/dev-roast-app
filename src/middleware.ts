import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const adminToken = request.cookies.get('admin_token');
  const adminSecret = process.env.ADMIN_SECRET_KEY;

  // If there's no secret key set in the environment, anyone can access admin.
  // This is for ease of development but insecure for production.
  if (!adminSecret) {
    return NextResponse.next();
  }

  // If the user is trying to access the login page, let them through.
  if (request.nextUrl.pathname === '/admin/login') {
    return NextResponse.next();
  }
  
  // For any other admin route, check for the token.
  if (!adminToken || adminToken.value !== adminSecret) {
    const loginUrl = new URL('/admin/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/admin/:path*',
}
