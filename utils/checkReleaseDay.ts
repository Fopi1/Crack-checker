import { FullGame } from "@/types/api";

export const checkReleaseDay = (game: FullGame, day: string | number) => {
  return Number(game.releaseDate.split("-")[2]) === day;
};
