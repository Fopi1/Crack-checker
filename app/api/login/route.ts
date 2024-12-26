"use server";

import bcrypt from "bcrypt";
import { prisma } from "@/prisma/prismaClient";
import { NextRequest, NextResponse } from "next/server";
import { generateAccessToken } from "@/lib/jwt";

export async function POST(request: NextRequest) {
  try {
    const { email, password, isRememberMe } = await request.json();

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }
    const { token, expirationDate } = generateAccessToken(user.id);

    const response = NextResponse.json({ success: true, userId: user.id });
    response.cookies.set("accessToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      expires: isRememberMe ? expirationDate : undefined,
    });
    return response;
  } catch (error) {
    console.error("Login error", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
