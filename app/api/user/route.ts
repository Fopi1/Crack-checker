import { prisma } from "@/prisma/prismaClient";
import { SiteApi } from "@/services/siteApi/apiClient";
import { Game } from "@prisma/client";
import { NextResponse } from "next/server";

type ResponseData = { error: string } | Game[];

export async function POST(): Promise<NextResponse<ResponseData>> {
  try {
    const userId = await SiteApi.users.getUserId();
    if (!userId) {
      return NextResponse.json({ error: "You're not logged in" });
    }
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: { likes: true },
    });
    if (!user) {
      return NextResponse.json({ error: "User doesn't exist" });
    }
    const games: Game[] = user.likes;
    return NextResponse.json(games);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: `Catched error ${error}` },
      { status: 401 }
    );
  }
}
