"use server";
import { NextRequest } from "next/server";

import { SEARCH_QUERY_LENGTH } from "@/constants";
import { getApiParams, jsonError, jsonResponse } from "@/lib/utils";
import { prisma } from "@/prisma/prisma";

export async function GET(req: NextRequest) {
  try {
    const searchParams = getApiParams(req.nextUrl.searchParams);
    const { query } = searchParams;
    if (query.length > SEARCH_QUERY_LENGTH) {
      const games = await prisma.game.findMany({
        include: {
          likes: {
            select: {
              gameId: true,
            },
          },
          categories: {
            select: {
              title: true,
            },
          },
          subscriptions: {
            select: {
              gameId: true,
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

      return jsonResponse({ data: games });
    } else {
      return jsonResponse({ data: [] });
    }
  } catch (error) {
    console.error("Failed to get games by query", error);
    return jsonError();
  }
}
