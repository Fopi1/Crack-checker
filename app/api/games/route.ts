"use server";

import { NextRequest, NextResponse } from "next/server";

import { SEARCH_QUERY_LENGTH } from "@/constants";
import { getApiParams } from "@/lib/utils";
import { prisma } from "@/prisma/prismaClient";
import { SiteApi } from "@/services/siteApi/apiClient";
import { SortBy, SortOrder } from "@/types/store";

export async function GET(req: NextRequest) {
  try {
    const searchParams = getApiParams(req.nextUrl.searchParams);
    const { query } = searchParams;
    if (query) {
      if (query.length > SEARCH_QUERY_LENGTH) {
        const games = await prisma.game.findMany({
          include: {
            likes: {
              select: {
                id: true,
              },
            },
            categories: {
              select: {
                title: true,
              },
            },
          },
          where: {
            title: {
              contains: query,
              mode: "insensitive",
            },
          },
        });

        return NextResponse.json(games);
      } else {
        return NextResponse.json([]);
      }
    }

    const {
      category = "",
      sortBy = "views",
      sortOrder = "descending",
      take = 25,
      isAAA = false,
    } = searchParams;
    const games = await prisma.game.findMany({
      include: {
        likes: {
          select: {
            id: true,
          },
        },
        categories: {
          select: {
            title: true,
          },
        },
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
