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
import { sortStore } from "@/shared/store/SortStore";
import { observer } from "mobx-react-lite";

interface Props {
  category: string;
  className?: string;
}

export const SortOptions: FC<Props> = observer(({ category, className }) => {
  const sortOptions = [
    {
      placeholder: "views",
      values: ["views", "crack date", "likes", "release date"],
      onChange: (option: string) => sortStore.setSortBy(option),
    },
    {
      placeholder: "descending",
      values: ["descending", "ascending"],
      onChange: (option: string) => sortStore.setSortOrder(option),
    },
    {
      placeholder: "2",
      values: ["2", "5", "10"],
      onChange: (value: string) => sortStore.setTakeGames(category, value),
    },
  ];
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
      <div className="flex items-center">
        <Checkbox id={category} />
        <label
          className="pl-2 text-sm select-none cursor-pointer"
          htmlFor={category}
        >
          Only AAA
        </label>
      </div>
    </div>
  );
});
