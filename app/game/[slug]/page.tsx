import { Metadata } from "next";

import { prisma } from "@/prisma/prismaClient";
import { FullGame } from "@/types/api";

import FPI from "./default";
import { Game } from "./game";

interface Props {
  params: { slug: string };
}

const cache = new Map<string, FullGame | null>();

const fetchGame = async (slug: string) => {
  const isCached = cache.has(slug);
  if (isCached) {
    console.log(`Кэш для ${slug} найден`);
    const game = cache.get(slug);
    return game;
  }
  const game = await prisma.game.findFirst({
    where: { slug },
    include: {
      likes: { select: { id: true } },
      categories: { select: { title: true } },
    },
  });

  cache.set(slug, game);
  return game;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const game = await fetchGame(params.slug);
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
  const game = await fetchGame(params.slug);

  if (!game) {
    return <FPI />;
  }
  return <Game game={game} />;
}
