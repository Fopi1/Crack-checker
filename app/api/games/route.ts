"use server";

import { NextRequest, NextResponse } from "next/server";

import { getApiParams } from "@/lib/utils";
import { prisma } from "@/prisma/prismaClient";
import { SiteApi } from "@/services/siteApi/apiClient";
import { SortBy, SortOrder } from "@/types/store";

export async function GET(req: NextRequest) {
  try {
    const {
      category = "",
      sortBy = "views",
      sortOrder = "descending",
      take = 25,
      isAAA = false,
    } = getApiParams(req.nextUrl.searchParams);
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
      isAAA === "true"
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
