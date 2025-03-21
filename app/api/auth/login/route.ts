"use server";

import { NextRequest, NextResponse } from 'next/server';

import { LoginFormSchema, loginFormSchema } from '@/app/login/constants';
import { CookieToken, rateLimiterPrefixes } from '@/constants/constants';
import { generateAccessToken } from '@/lib/jwt';
import { rateLimit } from '@/lib/redis';
import { comparePassword, responseApiFormError, setLaxCookie } from '@/lib/utils';
import { prisma } from '@/prisma/prismaClient';

export async function POST(req: NextRequest) {
  try {
    const limitError = await rateLimit(req, rateLimiterPrefixes.LOGIN, 10, 300);
    if (limitError) return limitError;
    const body = await req.json();
    const parseResult = loginFormSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: parseResult.error.format() },
        { status: 400 }
      );
    }
    const { email, password } = parseResult.data;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await comparePassword(password, user.password))) {
      return responseApiFormError<LoginFormSchema>({
        field: "root",
        error: "Invalid email or password",
        status: 401,
      });
    }
    const { token } = await generateAccessToken(user.id, user.name, user.email);

    setLaxCookie(CookieToken.AUTH_TOKEN, token);
    return NextResponse.json({ success: true, userId: user.id });
  } catch (error) {
    console.error("Login error", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
