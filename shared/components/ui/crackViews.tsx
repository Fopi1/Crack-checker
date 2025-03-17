import { Eye } from "lucide-react";

import { cn } from "@/shadcn/lib";

interface Props {
  className?: string;
  views: number;
}

export const CrackViews = ({ className, views }: Props) => {
  return (
    <div
      className={cn(
        "flex items-center gap-1 text-orange-300 font-bold w-full justify-end",
        className
      )}
    >
      <Eye size={16} strokeWidth={3} />
      {views}
    </div>
  );
};
