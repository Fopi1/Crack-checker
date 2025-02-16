import { z } from "zod";

import { FieldProps } from "@/types/form";

export const loginFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string(),
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
