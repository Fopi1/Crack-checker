"use server";

import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/prisma/prismaClient";
import { SiteApi } from "@/services/siteApi/apiClient";
import { AddValue } from "@/types/api";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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
        const payload = await SiteApi.users.getJWTPayload();
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
