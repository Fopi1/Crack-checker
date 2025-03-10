import { FullGame } from "@/types/api";

import { GameCard } from "../gamesGroup";

interface Props {
  games: FullGame[];
}

export const GamesGroup = ({ games }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 w-full responsive px-2 lg:px-0 z-[1]">
      {games.map((game) => {
        return <GameCard key={game.id} game={game} />;
      })}
    </div>
  );
};
