import { cn } from "@/lib/utils";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { type FieldProps } from "@/types/form";

interface Props<T extends FieldValues> {
  fields: FieldProps<T>[];
  form: UseFormReturn<T>;
  className?: string;
}

export const FormFields = <T extends FieldValues>({
  fields,
  form,
  className,
}: Props<T>) => {
  return (
    <div className={cn("flex flex-col gap-7 z-[2]", className)}>
      {fields.map((myField) => (
        <FormField
          key={myField.name}
          control={form.control}
          name={myField.name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{myField.label}</FormLabel>
              <FormControl>
                <Input
                  placeholder={myField.placeholder}
                  type={myField.type}
                  autoComplete="on"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </div>
  );
};
