import { cn } from "@/shadcn/lib";

interface Props {
  className?: string;
  protections: string;
}

export const CrackProtections = ({ className, protections }: Props) => {
  return (
    <div className={cn("flex gap-1 text-lg md:text-xl", className)}>
      <p>Protection:</p>
      <span className="text-blue-500 font-bold uppercase">{protections}</span>
    </div>
  );
};
