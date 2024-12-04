"use server";

import { prisma } from "@/prisma/prismaClient";
import { SiteApi } from "@/services/siteApi/apiClient";
import { PutProps, SortBy, SortOrder } from "@/types/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const category = request.nextUrl.searchParams.get("category") || "";
  const sortBy = (
    request.nextUrl.searchParams.get("sortBy") || "views"
  ).replaceAll(" ", "") as SortBy;
  const sortOrder = (request.nextUrl.searchParams.get("sortOrder") ||
    "descending") as SortOrder;
  const take = request.nextUrl.searchParams.get("take") || 25;
  const isAAAOption = request.nextUrl.searchParams.get("isAAA") === "true";
  const games = SiteApi.games.sortGames(
    await prisma.game.findMany({
      where: {
        categories: {
          some: {
            title: category,
          },
        },
      },
      take: Number(take),
    }),
    sortBy,
    sortOrder,
    isAAAOption
  );

  return NextResponse.json(games);
}

export async function PUT(request: NextRequest) {
  try {
    const { id: gameId, addValue }: PutProps = await request.json();

    switch (addValue) {
      case "views":
        await prisma.game.update({
          where: { id: gameId },
          data: { views: { increment: 1 } },
        });
        break;
      case "likes":
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

          await prisma.game.update({
            where: { id: gameId },
            data: { likes: { decrement: 1 } },
          });

          return NextResponse.json({ success: true, action: "disliked" });
        } else {
          await prisma.user.update({
            where: { id: userId },
            data: {
              likes: {
                connect: { id: gameId },
              },
            },
          });

          await prisma.game.update({
            where: { id: gameId },
            data: { likes: { increment: 1 } },
          });

          return NextResponse.json({ success: true, action: "liked" });
        }
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
