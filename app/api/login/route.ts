"use server";

import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';

import { CookieToken } from '@/constants';
import { generateAccessToken } from '@/lib/jwt';
import { setSecureCookie } from '@/lib/utils';
import { prisma } from '@/prisma/prismaClient';

export async function POST(request: NextRequest) {
  try {
    const { email, password, isRememberMe } = await request.json();

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json(
        { error: "There is no user with this email address." },
        { status: 404 }
      );
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }
    const { token } = await generateAccessToken(
      user.id,
      user.name,
      user.email
    );

    const response = NextResponse.json({ success: true, userId: user.id });
    setSecureCookie(response, CookieToken.AUTH_TOKEN, token);
    return response;
  } catch (error) {
    console.error("Login error", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
