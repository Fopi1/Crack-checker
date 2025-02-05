"use server";

import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/prisma/prismaClient";
import { SiteApi } from "@/services/siteApi/apiClient";
import { PutProps, SortBy, SortOrder } from "@/types/api";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      category = "",
      sortBy = "views",
      sortOrder = "descending",
      take = 25,
      isAAA = false,
    } = body;
    const games = await prisma.game.findMany({
      include: {
        likes: true,
      },
      where: {
        categories: {
          some: {
            title: category,
          },
        },
      },
      take: Number(take),
    });
    const sortedGames = SiteApi.games.sortGames(
      games,
      sortBy.replaceAll(" ", "") as SortBy,
      sortOrder as SortOrder,
      isAAA
    );
    return NextResponse.json(sortedGames);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch games" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { gameId, addValue }: PutProps = await request.json();
    switch (addValue) {
      case "view":
        await prisma.game.update({
          where: { id: gameId },
          data: { views: { increment: 1 } },
        });
        return NextResponse.json({ success: true });
      case "like":
        const userId = await SiteApi.users.getUserId();
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
        if (alreadyLiked) {
          await prisma.user.update({
            where: { id: userId },
            data: {
              likes: {
                disconnect: { id: gameId },
              },
            },
          });

          return NextResponse.json({ action: "disliked" });
        } else {
          await prisma.user.update({
            where: { id: userId },
            data: {
              likes: {
                connect: { id: gameId },
              },
            },
          });

          return NextResponse.json({ action: "liked" });
        }
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
