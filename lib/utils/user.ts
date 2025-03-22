"use server";

import { NextRequest } from 'next/server';

import { auth } from '@/auth';
import { prisma } from '@/prisma/prisma';

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

export const getLikedGames = async () => {
  const session = await auth(); 
  if (!session || !session.user.id) {
    return null;
  }
  const userId = session.user.id;
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { likes: true },
  });

  if (!user) {
    return null;
  }
  const likedGames = user.likes.map((game) => game.id);
  return likedGames;
};
