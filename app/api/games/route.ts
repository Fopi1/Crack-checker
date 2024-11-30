"use server";

import { prisma } from "@/prisma/prismaClient";
import { SiteApi } from "@/services/siteApi/apiClient";
import { SortBy, SortOrder } from "@/types/api";
import { NextRequest, NextResponse } from "next/server";

export type AddValue = "likes" | "views";

export type PutProps = {
  apiId: string;
  addValue: AddValue;
};

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
    const { apiId, addValue }: PutProps = await request.json();
    console.log(addValue);

    const game = await prisma.game.update({
      where: { apiId },
      data: { [addValue]: { increment: 1 } },
    });
    return NextResponse.json({ success: true, game: game });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
