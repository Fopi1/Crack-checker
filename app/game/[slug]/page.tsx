import { Metadata } from 'next';

import { prisma } from '@/prisma/prismaClient';

import FPI from './default';
import GameClient from './page.client';

interface Props {
  params: Promise<{ slug: string }>;
}

const fetchGame = async (slug: string) => {
  const game = await prisma.game.findFirst({
    where: { slug },
    include: {
      likes: { select: { id: true } },
      categories: { select: { title: true } },
    },
  });

  return game;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
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

export default async function GameServer(props: Props) {
  const params = await props.params;
  const game = await fetchGame(params.slug);

  if (!game) {
    return <FPI />;
  }
  return <GameClient initialData={game} />;
}
