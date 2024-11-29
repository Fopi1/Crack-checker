import { HTMLInputTypeAttribute } from "react";
import { FieldValues, Path } from "react-hook-form";

export type FieldProps<T extends FieldValues> = {
  name: Path<T>;
  placeholder: string;
  type: HTMLInputTypeAttribute;
  label: string;
};
