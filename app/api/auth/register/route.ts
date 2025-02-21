"use server";

import { NextRequest, NextResponse } from "next/server";

import {
  RegisterFormSchema,
  registerFormSchema,
} from "@/app/register/constants";
import { responseApiFormError } from "@/lib/utils";
import { prisma } from "@/prisma/prismaClient";
import { SiteApi } from "@/services/siteApi/apiClient";

export async function POST(req: NextRequest) {
  try {
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
    const hashedPassword = await SiteApi.users.hashPassword(password);
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
