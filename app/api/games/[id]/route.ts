"use server";

import { NextRequest } from 'next/server';

import { auth } from '@/lib/auth';
import { jsonError, jsonResponse } from '@/lib/utils';
import { prisma } from '@/prisma/prisma';
import { AddValue } from '@/types/api';

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, props: Params) {
  const params = await props.params;
  try {
    const { id } = params;
    const game = await prisma.game.findUnique({
      where: { id },
      include: {
        likes: { select: { gameId: true } },
        categories: { select: { title: true } },
        subscriptions: { select: { gameId: true } },
      },
    });
    if (!game) {
      return jsonError({ message: "Game not found", status: 404 });
    }
    return jsonResponse({ data: game });
  } catch (error) {
    console.error("Error while adding views or likes", error);
    return jsonError();
  }
}

export async function PUT(req: NextRequest, props: Params) {
  const params = await props.params;
  try {
    const { id: gameId } = params;
    const { addValue }: { addValue: AddValue } = await req.json();

    if (!gameId) {
      return jsonError({ message: "Game id is required", status: 400 });
    }

    const game = await prisma.game.findUnique({
      where: { id: gameId },
    });

    if (!game) {
      return jsonError({ message: "Game not found", status: 404 });
    }
    const session = await auth();
    const userId = session?.user.id;
    if (!userId) {
      return jsonError({ message: "You're not logined", status: 401 });
    }

    switch (addValue) {
      case "view":
        await prisma.game.update({
          where: { id: gameId },
          data: { views: { increment: 1 } },
        });
        return jsonResponse();
      case "like":
        const likedUser = await prisma.user.findUnique({
          where: {
            id: userId,
          },
          include: { likes: { select: { gameId: true } } },
        });
        if (!likedUser) {
          return jsonError({ message: "Liked user not found", status: 404 });
        }
        const alreadyLiked = likedUser?.likes.some(
          (like) => like.gameId === gameId
        );
        if (alreadyLiked) {
          await prisma.like.delete({
            where: { userId_gameId: { userId, gameId } },
          });
        } else {
          await prisma.like.create({
            data: {
              userId,
              gameId,
            },
          });
        }
        return jsonResponse({
          data: { action: alreadyLiked ? "disliked" : "liked" },
        });
      case "subscription":
        const subscribedUser = await prisma.user.findUnique({
          where: {
            id: userId,
          },
          include: { subscriptions: { select: { gameId: true } } },
        });
        const alreadySubscribed = subscribedUser?.subscriptions.some(
          (subscription) => subscription.gameId === gameId
        );
        if (alreadySubscribed) {
          await prisma.subscription.delete({
            where: { userId_gameId: { userId, gameId } },
          });
        } else {
          await prisma.subscription.create({
            data: {
              userId,
              gameId,
            },
          });
        }
        return jsonResponse({
          data: { action: alreadySubscribed ? "unsubscribed" : "subscribed" },
        });
      default:
        return jsonError({ message: "Unknown command", status: 400 });
    }
  } catch (error) {
    console.error("Error while performing action on a game", error);
    return jsonError();
  }
}
