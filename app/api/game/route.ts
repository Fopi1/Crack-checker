import { prisma } from "@/prisma/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { slug }: { slug: string } = await req.json();
    const game = await prisma.game.findFirst({
      include: {
        likes: true,
      },
      where: {
        slug,
      },
    });
    if (!game) {
      return NextResponse.json({ error: "Game not found" }, { status: 401 });
    }
    return NextResponse.json(game);
  } catch (error) {
    console.error("Error was happened while getting game by slug", error);
    return NextResponse.json({ error: error }, { status: 401 });
  } finally {
    await prisma.$disconnect();
  }
}
