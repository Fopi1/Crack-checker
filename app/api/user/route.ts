import { NextRequest, NextResponse } from "next/server";

import { UserInfoSchema, userInfoSchema } from "@/app/profile/constants";
import { CookieToken } from "@/constants";
import { generateAccessToken } from "@/lib/jwt";
import { responseApiFormError, setLaxCookie } from "@/lib/utils";
import { prisma } from "@/prisma/prismaClient";
import { SiteApi } from "@/services/siteApi/apiClient";

const userApiFormError = (
  args: Parameters<typeof responseApiFormError<UserInfoSchema>>[0]
) => responseApiFormError<UserInfoSchema>(args);
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const parseResult = userInfoSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: parseResult.error.format() },
        { status: 400 }
      );
    }
    const payload = await SiteApi.users.getJWTPayloadFromRequest(req);
    if (!payload) {
      return userApiFormError({
        field: "name",
        error: "Unathorized",
        status: 401,
      });
    }
    const email = payload.email;

    const { name: newName, email: newEmail } = parseResult.data;

    const [user, newEmailUser] = await Promise.all([
      prisma.user.findUnique({ where: { email } }),
      prisma.user.findUnique({
        where: { email: newEmail },
      }),
    ]);
    if (!user) {
      return userApiFormError({
        field: "root",
        error: "There is no user with your email address.",
        status: 404,
      });
    }
    if (newEmailUser && email !== newEmail) {
      return userApiFormError({
        field: "email",
        error: "User with this email already exist",
        status: 409,
      });
    }
    if (email !== newEmail || user.name !== newName) {
      const newUser = await prisma.user.update({
        where: { email },
        data: {
          email: newEmail,
          name: newName,
        },
      });
      const { token } = await generateAccessToken(
        newUser.id,
        newUser.name,
        newUser.email
      );
      const response = NextResponse.json({ success: true, user: newUser });
      setLaxCookie(response, CookieToken.AUTH_TOKEN, token);
      return response;
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Update user data error: ", error);
    return NextResponse.json(
      { error: "Internal server Error" },
      { status: 500 }
    );
  }
}
