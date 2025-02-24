import { Search } from "lucide-react";

import { cn } from "@/shadcn";

import { Input, Label } from "../../../shadcn/components/ui";

interface Props {
  className?: string;
  id: string;
}

export const SearchForm = ({ className, id }: Props) => {
  return (
    <search
      role="search"
      className={cn("h-[56px] w-[270px] xl:w-[500px]", className)}
    >
      <form
        action="/search"
        className={cn(
          "rounded-2xl bg-[#0b1320] flex items-center overflow-hidden h-[56px] w-[270px] xl:w-[500px]",
          className
        )}
      >
        <Label htmlFor={id} className="py-3 px-4">
          <Search size={20} strokeWidth={3} />
        </Label>
        <Input
          type="text"
          id={id}
          placeholder="Type game name to search & ENTER"
          className="bg-[#13162b] rounded-2xl w-full px-3 focus:outline-none h-10 mr-2 placeholder:text-sm placeholder:text-[#5b6271] border-none"
        />
      </form>
    </search>
  );
};
