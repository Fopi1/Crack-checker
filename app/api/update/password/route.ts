"use server";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

import {
  PasswordInfoSchema,
  passwordInfoSchema,
} from "@/app/profile/constants";
import { CookieToken } from "@/constants";
import { generateAccessToken } from "@/lib/jwt";
import { responseApiFormError, setLaxCookie } from "@/lib/utils";
import { prisma } from "@/prisma/prismaClient";
import { SiteApi } from "@/services/siteApi/apiClient";

const passwordApiFormError = (
  args: Parameters<typeof responseApiFormError<PasswordInfoSchema>>[0]
) => responseApiFormError<PasswordInfoSchema>(args);

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const parseResult = passwordInfoSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: parseResult.error.format() },
        { status: 400 }
      );
    }
    const payload = await SiteApi.users.getJWTPayload();
    if (!payload) {
      return passwordApiFormError({
        field: "root",
        error: "Unathorized",
        status: 401,
      });
    }
    const { email } = payload;
    const { password, currentPassword } = parseResult.data;

    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return passwordApiFormError({
        field: "root",
        error: "Unathorized",
        status: 401,
      });
    }
    if (!(await bcrypt.compare(currentPassword, user.password))) {
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
    const hashedPassword = await SiteApi.users.hashPassword(password);
    const newUser = await prisma.user.update({
      where: { email },
      data: {
        password: hashedPassword,
      },
    });
    const { token } = await generateAccessToken(
      newUser.id,
      newUser.name,
      newUser.email
    );
    const response = NextResponse.json({ success: true, user: newUser });
    setLaxCookie(CookieToken.AUTH_TOKEN, token);
    return response;
  } catch (error) {
    console.error("Update user password error: ", error);
    return NextResponse.json(
      { error: "Internal server Error" },
      { status: 500 }
    );
  }
}
