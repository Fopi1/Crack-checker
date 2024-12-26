import { verifyAccessToken } from "@/lib/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const token = req.cookies.get("accessToken");
  if (!token) {
    return NextResponse.json({ error: "Unathorized" }, { status: 401 });
  }
  try {
    const decodedToken = verifyAccessToken(token);
  } catch (error) {}
}
