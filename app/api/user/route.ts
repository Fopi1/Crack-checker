import { NextRequest, NextResponse } from "next/server";

import { generateAccessToken } from "@/lib/jwt";
import { prisma } from "@/prisma/prismaClient";

export async function PUT(req: NextRequest) {
  try {
    const { email, changeData } = await req.json();
    const { name: newName, email: newEmail } = changeData;
    const [user, newEmailUser] = await Promise.all([
      prisma.user.findUnique({ where: { email } }),
      prisma.user.findUnique({
        where: { email: newEmail },
      }),
    ]);
    if (!user) {
      return NextResponse.json(
        { error: "There is no user with this email address." },
        { status: 404 }
      );
    }
    if (newEmailUser) {
      return NextResponse.json(
        { error: "User with this email already exist" },
        { status: 409 }
      );
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
      response.cookies.set("accessToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        expires: undefined,
      });
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
