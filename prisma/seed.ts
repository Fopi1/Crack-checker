import axios from "axios";
import { prisma } from "./prisma-client";
import { GameFromAPI } from "@/types/types";

async function up() {
  const response = await axios.get("https://api.rawg.io/api/games", {
    params: {
      key: process.env.RAWG_API_KEY,
    },
  });

  const games: GameFromAPI[] = response.data.results;

  await prisma.card.createMany({
    data: games.map((game) => ({
      apiId: game.id,
      name: game.name,
      released: game.released,
      background_image: game.background_image,
    })),
  });
}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "Card" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await down();
    await up();
  } catch (e) {
    console.error(e);
  }
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
