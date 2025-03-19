"use server";

import { cookies } from "next/headers";
import { NextRequest } from "next/server";

import { CookieToken } from "@/constants/constants";
import { verifyAccessToken } from "@/lib/jwt";
import { prisma } from "@/prisma/prismaClient";

export const getUserIP = async (req: NextRequest) => {
  const forwardedFor = req.headers.get("x-forwarded-for");
  const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "unknown";
  return ip;
};

export const getUserAgent = async (req: NextRequest) => {
  const userAgent = req.headers.get("user-agent") || "unknown-user-agent";
  return userAgent;
};

export const getUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({ where: { email } });
};

export const getJWTPayload = async () => {
  const token = (await cookies()).get(CookieToken.AUTH_TOKEN)?.value;
  return token ? await verifyAccessToken(token) : null;
};

export const getLikedGames = async () => {
  const payload = await getJWTPayload();
  const userId = payload?.id;
  if (!userId) return null;
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { likes: true },
  });
  return user ? user.likes.map((game) => game.id) : null;
};
