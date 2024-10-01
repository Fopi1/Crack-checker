import { cn } from "@/lib/utils";
import { FC } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

interface Props {
  className?: string;
}

export const SortOptions: FC<Props> = ({ className }) => {
  const sortOptions = [
    {
      placeholder: "views",
      values: ["views", "crack date", "likes", "release date", "name"],
    },
    {
      placeholder: "descending",
      values: ["descending", "ascending"],
    },
    {
      placeholder: "16",
      values: ["4", "8", "16", "24", "30"],
    },
  ];


  return (
    <div className={cn("flex gap-3", className)}>
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
    </div>
  );
};
