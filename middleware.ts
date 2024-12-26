import { NextRequest, NextResponse } from "next/server";
import { verifyAccessToken } from "./lib/jwt";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;

  if (!token || !verifyAccessToken(token)) {
    console.log("Token can't be verified. Redirecting to login...");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/profile",
};
