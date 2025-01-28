import { Metadata } from "next";
import { prisma } from "@/prisma/prismaClient";
import GameClient from "./page.client";
import FPI from "./default";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const game = await prisma.game.findFirst({
    include: {
      likes: true,
    },
    where: {
      slug: params.slug,
    },
  });
  if (!game) {
    return {
      title: "Game not found",
      description: "The requested game could not be found.",
    };
  }
  return {
    title: `CrackChecker - ${game.title}`,
    description: `Details about ${game.title}`,
  };
}

export default async function GameServer({ params }: Props) {
  const gameExists = await prisma.game.findFirst({
    where: {
      slug: params.slug,
    },
    select: {
      id: true,
    },
  });

  if (!gameExists) {
    return <FPI />;
  }
  return <GameClient slug={params.slug} />;
}
