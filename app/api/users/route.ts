"use server";

import { NextRequest, NextResponse } from "next/server";

import { UserInfoSchema, userInfoSchema } from "@/app/(user)/profile/constants";
import { auth, signOut } from "@/auth";
import { rateLimiterPrefixes } from "@/constants";
import { rateLimit } from "@/lib/redis";
import { responseApiFormError } from "@/lib/utils";
import { prisma } from "@/prisma/prisma";

const userApiFormError = (
  args: Parameters<typeof responseApiFormError<UserInfoSchema>>[0]
) => responseApiFormError<UserInfoSchema>(args);
export async function PATCH(req: NextRequest) {
  try {
    const limitError = await rateLimit(req, rateLimiterPrefixes.INFO);
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
    const parseResult = userInfoSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: parseResult.error.format() },
        { status: 400 }
      );
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
      return NextResponse.json({ success: true });
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
    return NextResponse.json(
      { error: "Internal server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session?.user.id;
    if (!userId) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    await prisma.user.delete({
      where: { id: userId },
    });
    await signOut({ redirect: false });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete user error: ", error);
    return NextResponse.json(
      { error: "Internal server Error" },
      { status: 500 }
    );
  }
}
