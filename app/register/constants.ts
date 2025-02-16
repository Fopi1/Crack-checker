import { z } from "zod";

import { FieldProps } from "@/types/form";

export const minNameLength = 2;
export const maxNameLength = 20;

export const formSchema = z
  .object({
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
    password: z
      .string()
      .min(8, { message: "The password field must be at least 8 characters." }),
    confirmPassword: z.string(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type RegisterFormSchema = z.infer<typeof formSchema>;

export const registerFormFields: FieldProps<RegisterFormSchema>[] = [
  {
    name: "name",
    placeholder: "Type your name",
    type: "text",
    label: "Name",
    autocomplete: "name",
  },
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
    autocomplete: "new-password",
  },
  {
    name: "confirmPassword",
    placeholder: "Confirm your password",
    type: "password",
    label: "Confirm Password",
    autocomplete: "new-password",
  },
];
