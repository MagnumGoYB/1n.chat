import { type NextRequest, NextResponse } from 'next/server'

import { authConfig } from '@/config/auth'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (pathname === '/') {
    return NextResponse.next()
  }

  const publicPaths = authConfig.publicPaths ?? []
  const isPublicPath = publicPaths.some((path) => pathname === path)
  if (isPublicPath) {
    return NextResponse.next()
  }

  const session = request.cookies.get(authConfig.sessionKey)?.value
  if (session) {
    return NextResponse.next()
  }

  return NextResponse.redirect(new URL('/', request.url))
}

export const config = {
  matcher: ['/((?!api|icon|_next/static|_next/image|.*\\.png$).*)'],
}
