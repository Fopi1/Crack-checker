"use server";

import { verifyAccessToken } from "@/lib/jwt";
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
  const userId = verifyAccessToken(token)?.id;
  if (!userId) {
    return null;
  }
  return userId;
};

export const getLikedGames = async (): Promise<string[] | null> => {
  try {
    const userId = await getUserId();
    if (!userId) {
      throw new Error("Cannot find user id");
    }
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: { likes: true },
    });
    if (!user) {
      throw new Error("Cannot find user");
    }
    const gameIds = user.likes.map((game) => game.id);
    return gameIds;
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    prisma.$disconnect();
  }
};
