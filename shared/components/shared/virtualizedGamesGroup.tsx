"use client";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeGrid as Grid } from "react-window";

import { GameCard } from "./gameCard";

import type { FullGame } from "@/types/api";

interface Props {
  games: FullGame[];
}

const CARD_WIDTH = 330;
const CARD_HEIGHT = 330;
const GUTTER = 12;

export const VirtualizedGamesGroup = ({ games }: Props) => {
  return (
    <div className="w-full h-full">
      <AutoSizer>
        {({ height, width }) => {
          const columnCount = Math.floor(width / (CARD_WIDTH + GUTTER));
          const rowCount = Math.ceil(games.length / columnCount);

          return (
            <Grid
              columnCount={columnCount}
              columnWidth={CARD_WIDTH + GUTTER}
              height={height}
              rowCount={rowCount}
              rowHeight={CARD_HEIGHT + GUTTER}
              width={width}
            >
              {({ columnIndex, rowIndex, style }) => {
                const index = rowIndex * columnCount + columnIndex;
                const game = games[index];
                if (!game) return null;

                return (
                  <div style={style} className="w-full">
                    <GameCard game={game} />
                  </div>
                );
              }}
            </Grid>
          );
        }}
      </AutoSizer>
    </div>
  );
};
