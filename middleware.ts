import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";

import { AppRoutes, SiteApiRoutes } from "./constants";

export default auth((req) => {
  const isLoggedIn = Boolean(req.auth);
  const path = req.nextUrl.pathname;

  if (!isLoggedIn && path === AppRoutes.PROFILE) {
    return NextResponse.redirect(new URL(AppRoutes.LOGIN, req.url));
  }
  if (isLoggedIn && path === AppRoutes.LOGIN) {
    return NextResponse.redirect(new URL(AppRoutes.MAIN, req.url));
  }

  if (path === SiteApiRoutes.SYNC) {
    return NextResponse.redirect(new URL(AppRoutes.MAIN, req.url));
  }
  return NextResponse.next();
});
export const config = {
  matcher: ["/profile", "/login", "/api/sync"],
};
