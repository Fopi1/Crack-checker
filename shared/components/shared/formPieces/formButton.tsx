import { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react';

import { cn } from '@/shadcn';
import { Button } from '@/shadcn/components/ui';

interface Props
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    PropsWithChildren {
  className?: string;
}

export const FormButton: FC<Props> = ({ className, children, ...props }) => {
  return (
    <Button
      {...props}
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
