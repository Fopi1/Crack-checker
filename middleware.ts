import { NextRequest, NextResponse } from "next/server";

import { verifyAccessToken } from "./lib/jwt";

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const token = req.cookies.get("accessToken")?.value;

  if ((!token || !verifyAccessToken(token)) && path === "/profile") {
    console.log("Token can't be verified. Redirecting to login...");
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (token && path === "/login") {
    console.log("You already logined");
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile", "/login"],
};
