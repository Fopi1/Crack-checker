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

interface Props {
  title: string;
  className?: string;
}

export const SortOptions: FC<Props> = ({ title, className }) => {
  const sortOptions = [
    {
      placeholder: "views",
      values: ["views", "crack date", "likes", "release date"],
    },
    {
      placeholder: "descending",
      values: ["descending", "ascending"],
    },
    {
      placeholder: "25",
      values: ["25", "50", "100"],
    },
  ];

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <p className="text-sm">Sort by:</p>
      {sortOptions.map((option) => (
        <Select key={option.placeholder} defaultValue={option.placeholder}>
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
        <Checkbox id={title} />
        <label
          className="pl-2 text-sm select-none cursor-pointer"
          htmlFor={title}
        >
          Only AAA
        </label>
      </div>
    </div>
  );
};
