import { z } from "zod";

import { FormFieldsLength } from "@/constants";
import { FieldProps } from "@/types/form";

export const loginFormSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .transform((email) => email.toLowerCase()),
  password: z
    .string()
    .min(FormFieldsLength.password.minLength, {
      message: "Your password must be at least 8 characters long.",
    }),
});
export type LoginFormSchema = z.infer<typeof loginFormSchema>;

export const loginFormFields: FieldProps<LoginFormSchema>[] = [
  {
    name: "email",
    placeholder: "Type your email",
    type: "email",
    label: "Email",
    autocomplete: "email",
  },
  {
    name: "password",
    placeholder: "Type your password",
    type: "password",
    label: "Password",
    autocomplete: "current-password",
  },
];
