"use server";

import { NextResponse } from "next/server";

import { CookieToken } from "@/constants";
import { removeCookie } from "@/lib/utils";

export async function POST() {
  removeCookie(CookieToken.AUTH_TOKEN);
  return NextResponse.json(
    { message: "Logged out successfully" },
    { status: 200 }
  );
}
