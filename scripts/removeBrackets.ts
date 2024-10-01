import { prisma } from "@/prisma/prismaClient";

async function removeBrackets() {
  try {
    const oldGames = await prisma.game.findMany();
    console.log("Old games:", oldGames.slice(0, 1));
    const newGames = oldGames.map((game) => {
      return {
        ...game,
        hackedGroups: game.hackedGroups.replace(/[\[\]"\\]+/g, ""),
        protections: game.protections.replace(/[\[\]"\\]+/g, ""),
      };
    });
    console.log("New games:", newGames.slice(0, 1));
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
  } finally {
    await prisma.$disconnect();
  }
}

removeBrackets();
