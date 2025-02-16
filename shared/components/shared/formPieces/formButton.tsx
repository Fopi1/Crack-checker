import { FC, PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

import { Button } from "../../ui/shadcn";

interface Props extends PropsWithChildren {
  className?: string;
  disabled?: boolean;
}

export const FormButton: FC<Props> = ({ className, disabled, children }) => {
  return (
    <Button
      disabled={disabled}
      type="submit"
      className={cn(
        "uppercase font-semibold text-xs bg-gray-800 tracking-widest px-6",
        className
      )}
    >
      {children}
    </Button>
  );
};
