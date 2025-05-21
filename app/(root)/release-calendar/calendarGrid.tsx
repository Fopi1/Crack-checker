import { GameCard } from "@/shared/components/shared";
import { FullGame } from "@/types/api";
import { checkReleaseDay } from "@/utils";

interface Props {
  calendarMatrix: {
    day: number;
    from: "prev" | "current" | "next";
  }[][];
  games: FullGame[] | undefined;
}
export const CalendarGrid = ({ calendarMatrix, games }: Props) => {
  return (
    <>
      {calendarMatrix
        .flat()
        .filter(({ from }) => from === "current")
        .map(({ day, from }) => {
          return (
            <div className="rounded-lg h-fit" key={day}>
              <div className="flex justify-between">
                <h2 className="uppercase font-bold text-2xl text-[#D0A0FF]">
                  day: {day}
                </h2>
              </div>
              <div>
                {games
                  ? games
                      .filter(
                        (game) =>
                          checkReleaseDay(game, day) && from === "current",
                      )
                      .map((game) => <GameCard key={game.id} game={game} />)
                  : null}
              </div>
            </div>
          );
        })}
    </>
  );
};
