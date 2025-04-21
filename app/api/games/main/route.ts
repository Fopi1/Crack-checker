import { NextRequest } from "next/server";

import { getApiParams, jsonError, jsonResponse } from "@/lib/utils";
import { prisma } from "@/prisma/prisma";
import { SortBy, SortOrder } from "@/types/store";

export async function GET(req: NextRequest) {
  const searchParams = getApiParams(req.nextUrl.searchParams);
  try {
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
        likes: { select: { gameId: true } },
        categories: { select: { title: true } },
        subscriptions: { select: { gameId: true } },
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
    return jsonResponse({ data: games });
  } catch (error) {
    console.error(error);
    return jsonError();
  }
}
