import { NextResponse } from 'next/server';

import { auth } from '@/lib/nextAuth';

import { AppRoutes } from './constants';

export default auth((req) => {
  const session = req.auth;
  const isAdmin = session?.user.role === "admin";
  const path = req.nextUrl.pathname;

  if (path.startsWith("/api/admin") && !isAdmin) {
    return NextResponse.redirect(new URL(AppRoutes.MAIN, req.url));
  }
  if (!session && path === AppRoutes.PROFILE) {
    return NextResponse.redirect(new URL(AppRoutes.LOGIN, req.url));
  }
  if (session && path === AppRoutes.LOGIN) {
    return NextResponse.redirect(new URL(AppRoutes.MAIN, req.url));
  }

  return NextResponse.next();
});
export const config = {
  matcher: ["/profile", "/login", "/api/admin/:path*"],
};
