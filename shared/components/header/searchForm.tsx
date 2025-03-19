"use client";

import { Search } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { ChangeEvent } from 'react';

import { SiteApi } from '@/services/siteApi/apiClient';
import { cn, Input, Label } from '@/shadcn';
import { overlayStore } from '@/shared/store/overlayStore';
import { searchStore } from '@/shared/store/searchStore';
import { useAsyncEffect, useDebounce } from '@reactuses/core';

interface Props {
  className?: string;
  id: string;
  onFocus?: () => void;
}

export const SearchForm = observer(({ className, id, onFocus }: Props) => {
  const { userInput } = searchStore;
  const debouncedUserInput = useDebounce(userInput, 500);

  useAsyncEffect(
    async () => {
      if (debouncedUserInput.length > 2) {
        const games = await SiteApi.games.searchGame(debouncedUserInput);
        searchStore.setSearchedGames(games);
        searchStore.setIsOpened(true);
        overlayStore.setIsAppeared(true);
      } else {
        searchStore.setIsOpened(false);
        overlayStore.setIsAppeared(false);
      }
    },
    () => {},
    [debouncedUserInput]
  );

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    searchStore.setUserInput(event.target.value);
  };

  return (
    <search className={cn("h-[56px] w-[270px] xl:w-[500px]", className)}>
      <div className="rounded-2xl bg-[#0b1320] flex items-center overflow-hidden w-full">
        <Label htmlFor={id} className="py-3 px-4">
          <Search size={20} strokeWidth={3} />
        </Label>
        <Input
          onChange={handleOnChange}
          onFocus={onFocus}
          type="text"
          id={id}
          placeholder="Type game name to search & ENTER"
          className="bg-[#13162b] rounded-2xl w-full px-3 focus:outline-none h-10 mr-2 placeholder:text-sm placeholder:text-[#5b6271] border-none"
          value={userInput}
        />
      </div>
    </search>
  );
});
