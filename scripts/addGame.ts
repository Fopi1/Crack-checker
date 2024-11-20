import { prisma } from "@/prisma/prismaClient";
import { GameStatusApi } from "@/services/externalApi/apiClient";
import { AllGameData } from "@/types/api";

const checkIfGameExists = async (title: string): Promise<boolean> => {
  const game = await prisma.game.findFirst({
    where: { title },
  });
  const isGameExist = game !== undefined && game !== null;
  return isGameExist;
};

const addGame = async (title: string) => {
  try {
    const game: AllGameData = await GameStatusApi.games.getGameDetailsByTitle(
      title
    );
    if (game) {
      if (await checkIfGameExists(game.title)) {
        throw new Error("New game already exist");
      }
      await prisma.game.create({
        data: {
          apiId: game.id,
          slug: game.slug,
          title: game.title,
          isAAA: game.is_AAA,
          protections: game.protections,
          hackedGroups: game.hacked_groups,
          releaseDate: game.release_date,
          crackDate: game.crack_date,
          shortImage: game.short_image,
        },
      });
      console.log("The game:", game.title, "was added");
    } else {
      console.log("The game was not found");
    }
  } catch (error) {
    console.error("Catched error while adding new game", error);
  } finally {
    await prisma.$disconnect();
  }
};

const gameTitle = process.argv[2];

if (!gameTitle) {
  console.error("Give me a title");
  process.exit(1);
}

addGame(gameTitle);
