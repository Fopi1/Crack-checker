"use client";

import Link from "next/link";
import { FC } from "react";

import { cn } from "@/lib/utils";

import { Button } from "../ui/shadcn";

interface Props {
  linkText: string;
  linkHref: string;
  buttonText: string;
  buttonDisabled?: boolean;
  loginForm?: boolean;
  className?: string;
}

export const FormActions: FC<Props> = ({
  linkText,
  linkHref,
  buttonText,
  className,
  buttonDisabled = false,
}) => {
  return (
    <div className={cn("flex items-center gap-5 justify-end", className)}>
      <Link className="text-sm font-bold" href={linkHref}>
        {linkText}
      </Link>
      <Button
        disabled={buttonDisabled}
        type="submit"
        className="uppercase font-semibold text-xs bg-gray-800 tracking-widest px-6"
      >
        {buttonText}
      </Button>
    </div>
  );
};
