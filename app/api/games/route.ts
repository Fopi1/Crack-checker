import { prisma } from "@/prisma/prismaClient";
import { NextResponse } from "next/server";

export async function GET() {
  const games = await prisma.game.findMany({
    where: {
      categories: {
        some: {
          title: "Popular games",
        },
      },
    },
  });

  return NextResponse.json(games);
}
