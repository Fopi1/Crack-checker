"use server";

import { NextRequest, NextResponse } from "next/server";

import { getJWTPayload } from "@/lib/utils";
import { prisma } from "@/prisma/prismaClient";
import { AddValue } from "@/types/api";

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
        likes: { select: { id: true } },
        categories: { select: { title: true } },
      },
    });
    if (!game) {
      return NextResponse.json(
        { error: "Game with this id doesnt exist" },
        { status: 404 }
      );
    }
    return NextResponse.json(game);
  } catch (error) {
    console.error("Error while adding views or likes", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest, props: Params) {
  const params = await props.params;
  try {
    const { id: gameId } = params;
    const { addValue }: { addValue: AddValue } = await req.json();

    if (!gameId) {
      return NextResponse.json(
        { error: "gameId is required" },
        { status: 400 }
      );
    }

    const game = await prisma.game.findUnique({
      where: { id: gameId },
    });

    if (!game) {
      return NextResponse.json({ error: "Game not found" }, { status: 404 });
    }

    switch (addValue) {
      case "view":
        await prisma.game.update({
          where: { id: gameId },
          data: { views: { increment: 1 } },
        });
        return NextResponse.json({ success: true });
      case "like":
        const payload = await getJWTPayload();
        const userId = payload?.id;
        if (!userId) {
          return NextResponse.json(
            { error: "You're not logged in" },
            { status: 401 }
          );
        }
        const user = await prisma.user.findUnique({
          where: {
            id: userId,
          },
          include: { likes: { select: { id: true } } },
        });
        const alreadyLiked = user?.likes.some((game) => game.id === gameId);
        await prisma.user.update({
          where: { id: userId },
          data: {
            likes: alreadyLiked
              ? { disconnect: { id: game.id } }
              : { connect: { id: game.id } },
          },
        });
        return NextResponse.json({
          action: alreadyLiked ? "disliked" : "liked",
        });
      default:
        return NextResponse.json({ error: "Unknown command" }, { status: 500 });
    }
  } catch (error) {
    console.error("Error while adding views or likes", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
