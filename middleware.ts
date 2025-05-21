import { NextResponse } from "next/server";

import { auth } from "@/lib/nextAuth";

import { ApiHeaders, AppRoutes } from "./constants";

export default auth((req) => {
  const { nextUrl, auth: session } = req;
  const path = nextUrl.pathname;
  const apiKey = req.headers.get(ApiHeaders.API_KEY);
  const isAdmin =
    session?.user.role === "admin" ||
    (apiKey && apiKey === process.env.API_KEY);

  if (path.startsWith("/api/admin") && !isAdmin) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }
  if (path === AppRoutes.ADMIN_PANEL && !isAdmin) {
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
  matcher: ["/profile", "/login", "/api/admin/:path*", "/admin-panel"],
};
