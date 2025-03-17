import { cn } from "@/shadcn/lib";

interface Props {
  className?: string;
  crackTextColor: string;
  crackedBy: string;
}

export const CrackCracker = ({
  className,
  crackTextColor,
  crackedBy,
}: Props) => {
  return (
    <div className={cn("flex gap-1", className)}>
      <p>Cracked by:</p>
      <span className={cn("font-bold uppercase", crackTextColor)}>
        {crackedBy}
      </span>
    </div>
  );
};
