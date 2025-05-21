import { prisma } from "@/prisma/prisma";

const removeBrackets = async () => {
  try {
    const oldGames = await prisma.game.findMany();
    const newGames = oldGames.map((game) => {
      return {
        ...game,
        hackedGroups: game.hackedGroups.replace(/[\[\]"\\]+/g, ""),
        protections: game.protections.replace(/[\[\]"\\]+/g, ""),
      };
    });
    newGames.forEach(async (game) => {
      await prisma.game.update({
        where: {
          id: game.id,
        },
        data: game,
      });
    });
    console.log("Brackets was successfully removed!");
  } catch (error) {
    console.error(error);
  }
};

removeBrackets();
