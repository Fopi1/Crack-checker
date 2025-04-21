"use client";

import { X } from "lucide-react";
import { observer } from "mobx-react-lite";

import { Button } from "@/shadcn";
import { useSearchGames } from "@/shared/hooks/useSearchGames";
import { overlayStore } from "@/shared/store/overlayStore";
import { searchStore } from "@/shared/store/searchStore";

import { VirtualizedGamesGroup } from "../shared";

export const SearchedGames = observer(() => {
  const { data: games, isLoading } = useSearchGames(
    searchStore.debouncedUserInput
  );

  const handleOnClick = () => {
    overlayStore.removeSearchOverlay();
  };

  return (
    <div className="absolute top-full mt-5 w-full bg-crack-search h-fit max-h-[500px] xl:max-h-[800px] rounded-lg border-2 border-white overscroll-none">
      <div className="sticky top-0 w-full z-50 p-5 pb-0">
        <Button className="rounded-sm" onClick={handleOnClick}>
          <X strokeWidth={3} />
        </Button>
      </div>
      <div className="w-full max-h-[calc(500px-60px)] xl:max-h-[calc(800px-60px)] custom-scrollbar p-5 pt-0 text-center">
        {isLoading ? (
          "Loading..."
        ) : games?.length ? (
          <div className="h-[440px] xl:h-[740px]">
            <VirtualizedGamesGroup games={games} />
          </div>
        ) : (
          "No games were found"
        )}
      </div>
    </div>
  );
});
