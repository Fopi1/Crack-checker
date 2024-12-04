import { prisma } from "@/prisma/prismaClient";
import { SiteApi } from "@/services/siteApi/apiClient";
import { Game } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST() {
  const userId = await SiteApi.users.getUserId();
  if (!userId) {
    return NextResponse.json(
      { error: "You're not logged in" },
      { status: 401 }
    );
  }
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: { likes: true },
  });
  if (!user) {
    return NextResponse.json({ error: "User doesn't exist" }, { status: 401 });
  }
  const games: Game[] = user.likes;
  const gameIds = games.map((game) => game.id);
  return NextResponse.json(gameIds);
}
