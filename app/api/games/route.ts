"use server";

import { NextRequest } from 'next/server';

import { SEARCH_QUERY_LENGTH } from '@/constants';
import { getApiParams, jsonError, jsonResponse } from '@/lib/utils';
import { prisma } from '@/prisma/prisma';
import { SortBy, SortOrder } from '@/types/store';

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
