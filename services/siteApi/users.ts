"use server";

import { verifyToken } from "@/lib/jwt";
import { prisma } from "@/prisma/prismaClient";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";

export const hashPassword = async (password: string) =>
  await bcrypt.hash(password, 10);

export const checkIfEmailExist = async (email: string) => {
  return !!(await prisma.user.findUnique({
    where: {
      email: email,
    },
  }));
};

export const getUserId = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("accessToken")?.value;
  if (!token) {
    return null;
  }
  const userId = verifyToken(token)?.id;
  if (!userId) {
    return null;
  }
  return userId;
};
