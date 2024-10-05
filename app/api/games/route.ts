import { prisma } from "@/prisma/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const category = request.nextUrl.searchParams.get("category") || "";
  const games = await prisma.game.findMany({
    where: {
      categories: {
        some: {
          title: category,
        },
      },
    },
  });

  return NextResponse.json(games);
}
