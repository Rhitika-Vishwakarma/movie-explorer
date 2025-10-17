import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicRoutes = ['/', '/login', '/register'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Allow public routes
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }
  
  // Allow all other routes (since we use localStorage, not cookies)
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};