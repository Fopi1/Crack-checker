"use server";

import { NextRequest, NextResponse } from "next/server";

import { UserInfoSchema, userInfoSchema } from "@/app/(me)/profile/constants";
import { RateLimiterPrefixes } from "@/constants";
import { auth, signOut } from "@/lib/auth";
import { rateLimit } from "@/lib/redis";
import { jsonError, responseApiFormError } from "@/lib/utils";
import { prisma } from "@/prisma/prisma";

const userApiFormError = (
  args: Parameters<typeof responseApiFormError<UserInfoSchema>>[0]
) => responseApiFormError<UserInfoSchema>(args);
export async function PATCH(req: NextRequest) {
  try {
    const limitError = await rateLimit(req, RateLimiterPrefixes.INFO);
    if (limitError) return limitError;

    const session = await auth();
    if (!session) {
      return userApiFormError({
        field: "root",
        error: "Unathorized",
        status: 401,
      });
    }
    const userId = session?.user.id;
    if (!userId) {
      return userApiFormError({
        field: "root",
        error: "Invalid user",
        status: 400,
      });
    }
    const body = await req.json();
    const parseResult = userInfoSchema.safeParse(body);
    if (!parseResult.success) {
      return userApiFormError({
        field: "root",
        error: "Invalid data",
        status: 400,
      });
    }
    const { name: newName, email: newEmail } = parseResult.data;

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return userApiFormError({
        field: "root",
        error: "There is no user with your email address.",
        status: 404,
      });
    }
    if (newEmail && user.email !== newEmail) {
      const newEmailUser = await prisma.user.findFirst({
        where: { email: newEmail },
      });
      if (newEmailUser) {
        return userApiFormError({
          field: "email",
          error: "User with this email already exist",
          status: 409,
        });
      }
    }

    if (newName === user.name && newEmail === user.email) {
      return userApiFormError({
        field: "root",
        error: "Nothing to update",
        status: 422,
      });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name: newName,
        email: newEmail,
      },
      select: {
        name: true,
        email: true,
      },
    });
    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Update user data error: ", error);
    return jsonError();
  }
}

export async function DELETE() {
  try {
    const session = await auth();
    if (!session) {
      return userApiFormError({
        field: "root",
        error: "Unathorized",
        status: 401,
      });
    }
    const userId = session?.user.id;
    if (!userId) {
      return userApiFormError({
        field: "root",
        error: "Invalid user",
        status: 400,
      });
    }

    await prisma.user.delete({
      where: { id: userId },
    });
    await signOut({ redirect: false });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete user error: ", error);
    return jsonError();
  }
}
