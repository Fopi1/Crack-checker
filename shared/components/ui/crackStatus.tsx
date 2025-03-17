import { cn } from "@/shadcn/lib";

interface Props {
  className?: string;
  crackBackgroundColor: string;
  crackStatus: string;
}

export const CrackStatus = ({
  className,
  crackBackgroundColor,
  crackStatus,
}: Props) => {
  return (
    <div
      className={cn(
        `w-fit px-3 py-[2px] rounded-2xl text-sm font-semibold drop-shadow-status`,
        className,
        crackBackgroundColor
      )}
    >
      <p>{crackStatus}</p>
    </div>
  );
};
