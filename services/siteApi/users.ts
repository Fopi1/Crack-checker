"use server";

import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

import { CookieToken } from "@/constants/constants";
import { verifyAccessToken } from "@/lib/jwt";
import { prisma } from "@/prisma/prismaClient";

export const hashPassword = async (password: string) =>
  await bcrypt.hash(password, 10);

export const checkIfEmailExist = async (email: string) => {
  return Boolean(
    await prisma.user.findUnique({
      where: {
        email: email,
      },
    })
  );
};

export const getJWTPayloadFromCookies = async () => {
  const token = cookies().get(CookieToken.AUTH_TOKEN)?.value;
  const payload = token ? await verifyAccessToken(token) : null;
  return payload;
};

export const getJWTPayloadFromRequest = async (req: NextRequest) => {
  const token = req.cookies.get(CookieToken.AUTH_TOKEN)?.value;
  const payload = token ? await verifyAccessToken(token) : null;
  return payload;
};

export const removeCookiePayload = async () => {
  cookies().delete(CookieToken.AUTH_TOKEN);
};

export const getLikedGames = async (): Promise<string[] | null> => {
  try {
    const payload = await getJWTPayloadFromCookies();
    const userId = payload?.id;
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
  }
};
