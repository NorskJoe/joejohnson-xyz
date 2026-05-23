import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@libs/auth';

const PUBLIC_PATHS = ['/admin/auth', '/api/auth', '/api/auth/', '/favicon.ico'];

const PUBLIC_FILE = /\.(.*)$/;

function isPublicPath(pathname: string) {
  return (
    PUBLIC_PATHS.some((path) => pathname.startsWith(path)) ||
    PUBLIC_FILE.test(pathname) ||
    pathname.startsWith('/_next/')
  );
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  const session = await auth();

  if (!session) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/admin/auth';
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
};
