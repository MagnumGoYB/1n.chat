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

  const redirectUrl = request.nextUrl.clone()
  redirectUrl.pathname = '/'
  redirectUrl.searchParams.set('unauthorized', 'true')
  redirectUrl.searchParams.set('redirect', pathname)
  return NextResponse.redirect(redirectUrl)
}

export const config = {
  matcher: ['/((?!api|icon|_next/static|_next/image|.*\\.png$).*)'],
}
