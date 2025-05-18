import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow access to root, /w/*, and /api/* routes
  if (
    pathname === '/' ||
    pathname.startsWith('/w/') ||
    pathname.startsWith('/api/')
  ) {
    return NextResponse.next()
  }

  // Redirect all other routes to home page
  return NextResponse.redirect(new URL('/', request.url))
}

// Configure which routes this middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
} 