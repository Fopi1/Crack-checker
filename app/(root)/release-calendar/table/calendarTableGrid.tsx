"use client";

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
export const CalendarTableGrid = ({ calendarMatrix, games }: Props) => {
  return (
    <tbody>
      {calendarMatrix.map((week, wIndex) => (
        <tr key={wIndex}>
          {week.map(({ day, from }) => (
            <td
              key={day}
              className="align-top border-b border-r border-crack-theader first:border-l"
            >
              <div className="flex flex-col gap-5">
                <div
                  className={`${from === "current" ? "text-white" : "text-white/40"} font-bold text-xs text-right p-5`}
                >
                  {day}
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
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};
