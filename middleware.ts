import { type NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  console.log('Middleware pathname:', pathname)
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|icon|_next/static|_next/image|.*\\.png$).*)'],
}
