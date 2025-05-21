"use server";
import { getApiParams, jsonError, jsonResponse } from "@/lib/utils";
import { prisma } from "@/prisma/prisma";
import { NextRequest } from "next/server";

type Params = { year: string; monthNumber: string };
export async function GET(req: NextRequest) {
  const params = getApiParams<Params>(req.nextUrl.searchParams);
  try {
    const monthGames = await prisma.game.findMany({
      where: {
        releaseDate: {
          contains: `${params.year}-${params.monthNumber}`,
        },
      },
      include: {
        likes: true,
        categories: true,
        subscriptions: true,
      },
    });
    return jsonResponse({ data: monthGames });
  } catch (error) {
    console.error("Api route calendar", error);
    return jsonError({ message: "Api route calendar" });
  }
}
