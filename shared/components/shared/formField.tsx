import { FC, HTMLInputTypeAttribute } from "react";
import { Input, Label } from "../ui";
import { cn } from "@/lib/utils";

// Todo Возможно перенести его в папку types
export interface FormFieldProps {
  id: string;
  type: HTMLInputTypeAttribute;
  label: string;
  placeholder?: string;
  className?: string;
}

export const FormField: FC<FormFieldProps> = ({
  id,
  placeholder,
  type,
  label,
  className,
}) => {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label htmlFor={id}>{label}</Label>
      <Input
        placeholder={placeholder}
        id={id}
        type={type}
        className="z-[2] h-12"
      />
    </div>
  );
};
