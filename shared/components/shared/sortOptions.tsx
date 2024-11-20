"use client";

import { cn } from "@/lib/utils";
import { FC } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Checkbox } from "@/shared/components/ui";
import { sortStore } from "@/shared/store/sortStore";
import { observer } from "mobx-react-lite";
import { SortBy, SortOrder, TakeGames } from "@/types/api";

interface Props {
  category: string;
  className?: string;
}

export const SortOptions: FC<Props> = observer(({ category, className }) => {
  const sortOptions = [
    {
      placeholder: sortStore.categoriesSortOptions[category].sortBy,
      values: ["views", "crack Date", "likes", "release Date"],
      onChange: (sortBy: SortBy) => sortStore.setSortBy(category, sortBy),
    },
    {
      placeholder: sortStore.categoriesSortOptions[category].sortOrder,
      values: ["descending", "ascending"],
      onChange: (sortOrder: SortOrder) =>
        sortStore.setSortOrder(category, sortOrder),
    },
    {
      placeholder: sortStore.categoriesSortOptions[category].takeGames,
      values: ["5", "10", "25"],
      onChange: (value: TakeGames) => sortStore.setTakeGames(category, value),
    },
  ];
  const handleSetIsAAAOption = () => {
    sortStore.toggleIsAAA(category);
  };
  const handleLableClick = (
    event: React.MouseEvent<HTMLLabelElement, MouseEvent>
  ) => {
    event.stopPropagation();
  };
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <p className="text-sm">Sort by:</p>
      {sortOptions.map((option) => (
        <Select
          key={option.placeholder}
          defaultValue={option.placeholder}
          onValueChange={option.onChange}
        >
          <SelectTrigger className="w-auto gap-5 capitalize">
            <SelectValue placeholder={option.placeholder} />
          </SelectTrigger>
          <SelectContent>
            {option.values.map((value) => (
              <SelectItem key={value} className="capitalize" value={value}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ))}
      <div onClick={handleSetIsAAAOption} className="flex items-center">
        <Checkbox className="rounded-full" id={category} />
        <label
          onClick={handleLableClick}
          className="pl-2 text-sm select-none cursor-pointer"
          htmlFor={category}
        >
          Only AAA
        </label>
      </div>
    </div>
  );
});
