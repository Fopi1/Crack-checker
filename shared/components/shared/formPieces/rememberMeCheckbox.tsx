"use client";

import { observer } from "mobx-react-lite";

import { cn } from "@/shadcn";
import { Checkbox, Label } from "@/shadcn/components/ui";

interface Props {
  className?: string;
}

export const RememberMeCheckbox = observer(({ className }: Props) => {
  // const handleToggleIsRememberMe = () => {
  //   authStore.toggleIsRememberMe();
  // };
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Checkbox
        // onClick={handleToggleIsRememberMe}
        className="rounded-[2px]"
        id="checkbox"
      />
      <Label className="cursor-pointer" htmlFor="checkbox">
        Remember me
      </Label>
    </div>
  );
});
