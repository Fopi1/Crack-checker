import { NextRequest, NextResponse } from "next/server";

import { verifyAccessToken } from "./lib/jwt";

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const token = req.cookies.get("accessToken")?.value;

  const isValidToken = token ? Boolean(await verifyAccessToken(token)) : false;

  if (!isValidToken && path === "/profile") {
    console.log("Token can't be verified. Redirecting to login...");
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (isValidToken && path === "/login") {
    console.log("You already logined");
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile", "/login"],
};
