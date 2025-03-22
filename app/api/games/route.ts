"use server";

import { NextRequest, NextResponse } from "next/server";

import { SEARCH_QUERY_LENGTH } from "@/constants";
import { getApiParams } from "@/lib/utils";
import { prisma } from "@/prisma/prisma";
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
      sortBy = "views" as SortBy,
      sortOrder = "descending" as SortOrder,
      take = "25",
      isAAA = "false",
    } = searchParams;
    const replacedSortBy = sortBy.replaceAll(" ", "");
    const games = await prisma.game.findMany({
      include: {
        likes: { select: { id: true } },
        categories: { select: { title: true } },
      },
      where: {
        categories: { some: { title: category } },
        ...(isAAA === "true" ? { isAAA: true } : {}),
      },
      take: Number(take),
      orderBy:
        replacedSortBy === "likes"
          ? { likes: { _count: sortOrder === "descending" ? "desc" : "asc" } }
          : { [replacedSortBy]: sortOrder === "descending" ? "desc" : "asc" },
    });
    return NextResponse.json(games);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch games" },
      { status: 500 }
    );
  }
}
