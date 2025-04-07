"use server";

import { auth } from '@/lib/auth';
import { prisma } from '@/prisma/prisma';
import { AnyRequest } from '@/types/lib';

export const getUserIP = async (req: AnyRequest) => {
  const forwardedFor = req.headers.get("x-forwarded-for");
  const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "unknown";
  return ip;
};

export const getUserAgent = async (req: AnyRequest) => {
  const userAgent = req.headers.get("user-agent") || "unknown-user-agent";
  return userAgent;
};

export const getUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({ where: { email } });
};

export const getLikedGames = async () => {
  const session = await auth();
  if (!session || !session.user.id) {
    return [];
  }
  const userId = session.user.id;
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { likes: true },
  });

  if (!user) {
    return [];
  }
  const likedGames = user.likes.map((like) => like.gameId);
  return likedGames;
};

export const getSubscriptions = async () => {
  const session = await auth();
  if (!session || !session.user.id) {
    return [];
  }
  const userId = session.user.id;
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { subscriptions: true },
  });
  if (!user) {
    return [];
  }
  const subscriptions = user.subscriptions.map(
    (subscription) => subscription.gameId
  );
  return subscriptions;
};
