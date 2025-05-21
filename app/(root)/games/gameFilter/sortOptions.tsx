"use client";

import { observer } from "mobx-react-lite";
import { usePathname } from "next/navigation";
import { useEffect, useMemo } from "react";

import { cn } from "@/shadcn";
import {
  Checkbox,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/components/ui";
import { sortStore } from "@/shared/store";
import { SortBy, SortOrder, TakeGames } from "@/types/store";

interface Props {
  category: string;
  className?: string;
}

export const SortOptions = observer(({ category, className }: Props) => {
  const pathname = usePathname();
  const sortOptions = useMemo(
    () => [
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
    ],
    [category],
  );
  const handleSetIsAAAOption = () => {
    sortStore.toggleIsAAA(category);
  };
  useEffect(() => {
    sortStore.disableAllIsAAA(category);
  }, [pathname, category]);
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-3 flex-wrap",
        className,
      )}
    >
      <p className="text-sm">Sort by:</p>
      <div className="flex items-center gap-0 md:gap-3">
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
      </div>
      <div className="flex items-center">
        <Checkbox
          onClick={handleSetIsAAAOption}
          className="rounded-full"
          id={category}
        />
        <Label
          className="pl-2 text-sm select-none cursor-pointer"
          htmlFor={category}
        >
          Only AAA
        </Label>
      </div>
    </div>
  );
});
