"use client";

import { Search } from "lucide-react";
import { observer } from "mobx-react-lite";

import { SiteApi } from "@/services/siteApi/apiClient";
import { cn, Input, Label } from "@/shadcn";
import { searchStore } from "@/shared/store/searchStore";
import { useAsyncEffect, useDebounceFn } from "@reactuses/core";

interface Props {
  className?: string;
  id: string;
}

export const SearchForm = observer(({ className, id }: Props) => {
  const { userInput } = searchStore;
  const debounceValue = useDebounceFn((input: string) => {
    searchStore.setUserInput(input);
  }, 500);

  useAsyncEffect(
    async () => {
      if (userInput.length > 2) {
        const games = await SiteApi.games.searchGame(userInput);
        searchStore.setSearchedGames(games);
      }
    },
    () => {},
    [userInput]
  );

  return (
    <search className={cn("h-[56px] w-[270px] xl:w-[500px]", className)}>
      <div className="rounded-2xl bg-[#0b1320] flex items-center overflow-hidden w-full">
        <Label htmlFor={id} className="py-3 px-4">
          <Search size={20} strokeWidth={3} />
        </Label>
        <Input
          onChange={(data) => debounceValue.run(data.target.value)}
          type="text"
          id={id}
          placeholder="Type game name to search & ENTER"
          className="bg-[#13162b] rounded-2xl w-full px-3 focus:outline-none h-10 mr-2 placeholder:text-sm placeholder:text-[#5b6271] border-none"
        />
      </div>
    </search>
  );
});
