"use client";

import { Search } from "lucide-react";
import { observer } from "mobx-react-lite";
import { usePathname } from "next/navigation";
import { ChangeEvent, useEffect } from "react";

import { cn, Input, Label } from "@/shadcn";
import { overlayStore } from "@/shared/store/overlayStore";
import { searchStore } from "@/shared/store/searchStore";

interface Props {
  className?: string;
  id: string;
}

export const SearchForm = observer(({ className, id }: Props) => {
  const pathname = usePathname();
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    searchStore.setUserInput(event.target.value);
  };
  const handleOnFocus = () => {
    if (searchStore.userInput.length > 2) overlayStore.addSearchOverlay();
  };
  useEffect(() => {
    if (searchStore.userInput.length > 2) {
      overlayStore.addSearchOverlay();
    } else {
      overlayStore.removeSearchOverlay();
    }
  }, [searchStore.userInput]);

  useEffect(() => {
    overlayStore.removeSearchOverlay();
  }, [pathname]);

  return (
    <search className={cn("h-[56px] w-[270px] xl:w-[500px]", className)}>
      <div className="rounded-2xl bg-[#0b1320] flex items-center overflow-hidden w-full">
        <Label htmlFor={id} className="py-3 px-4">
          <Search size={20} strokeWidth={3} />
        </Label>
        <Input
          onChange={handleOnChange}
          onFocus={handleOnFocus}
          type="text"
          id={id}
          placeholder="Type game name to search & ENTER"
          className="bg-[#13162b] rounded-2xl w-full px-3 focus:outline-none h-10 mr-2 placeholder:text-sm placeholder:text-[#5b6271] border-none"
          value={searchStore.userInput}
        />
      </div>
    </search>
  );
});
