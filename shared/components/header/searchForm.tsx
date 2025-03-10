"use client";

import { Search } from "lucide-react";
import { useState } from "react";

import { SiteApiRoutes } from "@/constants";
import { axiosSiteInstance } from "@/services/instance";
import { cn, Input, Label } from "@/shadcn";
import { FullGame } from "@/types/api";
import { useAsyncEffect, useDebounceFn } from "@reactuses/core";

interface Props {
  className?: string;
  id: string;
}

export const SearchForm = ({ className, id }: Props) => {
  const [userInput, setUserInput] = useState("");
  const debounceValue = useDebounceFn((input: string) => {
    setUserInput(input);
  }, 500);

  useAsyncEffect(
    async () => {
      if (userInput.length > 2) {
        const games = (
          await axiosSiteInstance.get<FullGame[] | []>(
            SiteApiRoutes.SEARCH_GAME(userInput)
          )
        ).data;
        console.log(games);
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
};
