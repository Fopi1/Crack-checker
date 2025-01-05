import { Metadata } from "next";
import { prisma } from "@/prisma/prismaClient";
import GameClient from "./page.client";

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

export default async function Game({ params }: Props) {
  const game = await prisma.game.findFirst({
    include: {
      likes: true,
    },
    where: {
      slug: params.slug,
    },
  });
  if (!game) {
    return <div>Game not found</div>;
  }

  return <GameClient game={game} />;
}
