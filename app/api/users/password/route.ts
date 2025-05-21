"use server";
import { NextRequest, NextResponse } from "next/server";

import {
  PasswordInfoSchema,
  passwordInfoSchema,
} from "@/app/(me)/profile/constants";
import { RateLimiterPrefixes } from "@/constants";
import { auth } from "@/lib/nextAuth";
import { rateLimit } from "@/lib/auth";
import {
  comparePassword,
  hashPassword,
  jsonError,
  responseApiFormError,
} from "@/lib/utils";
import { prisma } from "@/prisma/prisma";

const passwordApiFormError = (
  args: Parameters<typeof responseApiFormError<PasswordInfoSchema>>[0],
) => responseApiFormError<PasswordInfoSchema>(args);

export async function PATCH(req: NextRequest) {
  try {
    const limitError = await rateLimit(req, RateLimiterPrefixes.PASSWORD);
    if (limitError) return limitError;

    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session?.user.id;
    if (!userId) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }
    const body = await req.json();
    const parseResult = passwordInfoSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: parseResult.error.format() },
        { status: 400 },
      );
    }
    const { password, currentPassword } = parseResult.data;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      return passwordApiFormError({
        field: "root",
        error: "Unathorized",
        status: 401,
      });
    }
    if (!user.password) {
      return passwordApiFormError({
        field: "root",
        error: "Your authorization method does not support a password.",
        status: 422,
      });
    }
    if (!(await comparePassword(currentPassword, user.password))) {
      return passwordApiFormError({
        field: "currentPassword",
        error: "Invalid password",
        status: 401,
      });
    }
    if (password === currentPassword) {
      return passwordApiFormError({
        field: "password",
        error: "New password must be different from the current password",
        status: 409,
      });
    }
    const hashedPassword = await hashPassword(password);
    await prisma.user.update({
      where: { id: userId },
      data: {
        password: hashedPassword,
      },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Update user password error: ", error);
    return jsonError();
  }
}
