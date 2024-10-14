import { prisma } from "@/prisma/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const category = request.nextUrl.searchParams.get("category") || "";
  const take = request.nextUrl.searchParams.get("take") || 25;
  const games = await prisma.game.findMany({
    where: {
      categories: {
        some: {
          title: category,
        },
      },
    },
    take: Number(take),
  });

  return NextResponse.json(games);
}
