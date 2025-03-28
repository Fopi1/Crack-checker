"use server";

import { NextRequest, NextResponse } from 'next/server';

import { RegisterFormSchema, registerFormSchema } from '@/app/(user)/register/constants';
import { rateLimiterPrefixes } from '@/constants';
import { rateLimit } from '@/lib/redis';
import { hashPassword, responseApiFormError } from '@/lib/utils';
import { prisma } from '@/prisma/prisma';

export async function POST(req: NextRequest) {
  try {
    const limitError = await rateLimit(
      req,
      rateLimiterPrefixes.REGISTER,
      10,
      120
    );
    if (limitError) return limitError;
    const body = await req.json();
    const parseResult = registerFormSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: parseResult.error.format() },
        { status: 400 }
      );
    }
    const { name, email, password } = parseResult.data;
    const userWithSameEmail = await prisma.user.findUnique({
      where: { email },
    });
    if (userWithSameEmail) {
      return responseApiFormError<RegisterFormSchema>({
        field: "email",
        error: "User with this email already exists",
        status: 409,
      });
    }
    const hashedPassword = await hashPassword(password);
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Catched error while creating new user", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
