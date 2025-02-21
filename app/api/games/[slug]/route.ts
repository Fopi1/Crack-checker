import { NextRequest, NextResponse } from "next/server";

import { getParams } from "@/lib/utils";
import { prisma } from "@/prisma/prismaClient";
import { SiteApi } from "@/services/siteApi/apiClient";
import { AddValue } from "@/types/api";

export async function GET(req: NextRequest) {
  try {
    const params = getParams(req.nextUrl.searchParams);
    const { slug } = params;
    const game = await prisma.game.findFirst({
      where: {
        slug,
      },
      include: {
        likes: true,
      },
    });
    if (!game) {
      return NextResponse.json({ error: "Game not found" }, { status: 401 });
    }
    return NextResponse.json(game);
  } catch (error) {
    console.error("Error fetching game", error);
    return NextResponse.json({ error: error }, { status: 401 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { addValue, gameId }: { addValue: AddValue; gameId: string } =
      await req.json();

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
        const payload = await SiteApi.users.getJWTPayloadFromRequest(req);
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
          include: { likes: true },
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
