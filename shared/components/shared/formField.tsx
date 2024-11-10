import { FC, HTMLInputTypeAttribute, InputHTMLAttributes } from "react";
import { Input, Label } from "../ui";
import { cn } from "@/lib/utils";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  type: HTMLInputTypeAttribute;
  label: string;
  placeholder?: string;
  error?: string;
  className?: string;
}

export const FormField: FC<FormFieldProps> = ({
  id,
  type,
  label,
  placeholder,
  error,
  className,
  ...props
}) => {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label htmlFor={id}>{label}</Label>
      <Input
        {...props}
        placeholder={placeholder}
        id={id}
        type={type}
        className="z-[2] h-12"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};
