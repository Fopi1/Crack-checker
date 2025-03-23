"use client";

import { X } from 'lucide-react';
import { observer } from 'mobx-react-lite';

import { Button } from '@/shadcn';
import { useSearchGames } from '@/shared/hooks/useSearchGames';
import { overlayStore } from '@/shared/store/overlayStore';
import { searchStore } from '@/shared/store/searchStore';

import { GamesGroup } from '../shared/gamesGroup';

export const SearchedGames = observer(() => {
  const { data: games, isLoading } = useSearchGames(
    searchStore.debouncedUserInput
  );

  const handleOnClick = () => {
    overlayStore.removeSearchOverlay();
  };

  return (
    <div className="absolute top-full mt-5 w-full bg-[--background-secondary] h-fit max-h-[500px] xl:max-h-[800px] rounded-lg border-2 border-white overscroll-none z-40">
      <div className="sticky top-0 w-full bg-[--background-secondary] z-50 p-5 pb-0">
        <Button className="rounded-sm" onClick={handleOnClick}>
          <X strokeWidth={3} />
        </Button>
      </div>
      <div className="w-full max-h-[calc(500px-60px)] xl:max-h-[calc(800px-60px)] overflow-y-scroll custom-scrollbar p-5 pt-0 text-center">
        {isLoading ? (
          "Loading..."
        ) : games?.length ? (
          <GamesGroup games={games} />
        ) : (
          "No games were found"
        )}
      </div>
    </div>
  );
});
