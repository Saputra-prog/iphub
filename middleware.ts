import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const cookie = request.cookies.get('isAdminLoggedIn');
  const url = request.url;

  // Jangan batasi halaman login agar tidak terjadi redirect loop
  if (url.includes('/Admin/login')) {
    return NextResponse.next();
  }

  // Jika mengakses halaman admin lain tapi belum login, arahkan ke login
  if (!cookie && url.includes('/Admin')) {
    return NextResponse.redirect(new URL('/Admin/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/Admin/:path*',
};