import { z } from "zod";

import { FieldProps } from "@/types/form";

import { maxNameLength, minNameLength } from "../register/constants";

export const baseInfoFormSchema = z.object({
  name: z
    .string()
    .min(minNameLength, {
      message: `Username must be at least ${minNameLength} characters`,
    })
    .max(maxNameLength, {
      message: `Username must be less than ${maxNameLength} characters long`,
    })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username must contain only Latin letters and numbers",
    }),
  email: z.string().email("Invalid email address"),
});
export type BaseInfoFormSchema = z.infer<typeof baseInfoFormSchema>;

export const baseInfoFormFields: FieldProps<BaseInfoFormSchema>[] = [
  {
    name: "name",
    placeholder: "",
    type: "string",
    label: "Name",
  },
  { name: "email", placeholder: "", type: "email", label: "Email" },
];
