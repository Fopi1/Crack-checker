"use client";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeGrid as Grid } from "react-window";

import { GameCard } from "./gameCard";

import type { FullGame } from "@/types/api";

interface Props {
  games: FullGame[];
}

const CARD_WIDTH = 335;
const CARD_HEIGHT = 330;
const GAP_WIDTH = 16;
const GAP_HEIGHT = 28;

export const VirtualizedGamesGroup = ({ games }: Props) => {
  return (
    <div className="w-full h-full">
      <AutoSizer>
        {({ height, width }) => {
          const columnCount = Math.floor(width / (CARD_WIDTH + GAP_WIDTH)) || 1;
          const rowCount = Math.ceil(games.length / columnCount);

          const columnWidth =
            columnCount === 1 ? width - GAP_WIDTH : CARD_WIDTH + GAP_WIDTH;
          const rowHeight =
            columnCount === 1 ? height - GAP_HEIGHT : CARD_HEIGHT + GAP_HEIGHT;
          return (
            <Grid
              columnCount={columnCount}
              columnWidth={columnWidth}
              height={height}
              rowCount={rowCount}
              rowHeight={rowHeight}
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
