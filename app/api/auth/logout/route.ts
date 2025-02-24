"use server";

import { NextResponse } from "next/server";

import { SiteApi } from "@/services/siteApi/apiClient";

export async function POST() {
  try {
    await SiteApi.users.removeCookiePayload();
    return NextResponse.json(
      { message: "Logged out successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ error: "Logout failed" }, { status: 500 });
  }
}
