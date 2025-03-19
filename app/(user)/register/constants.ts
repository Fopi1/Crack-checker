import { z } from "zod";

import { FormFieldsLength } from "@/constants";
import { FieldProps } from "@/types/form";

const { minLength: minNameLength, maxLength: maxNameLength } =
  FormFieldsLength.name;

const { minLength: minPasswordLength } = FormFieldsLength.password;

export const registerFormSchema = z
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
    email: z
      .string()
      .trim()
      .email("Invalid email address")
      .transform((email) => email.toLowerCase()),
    password: z.string().min(minPasswordLength, {
      message: `The password field must be at least ${minPasswordLength} characters.`,
    }),
    confirmPassword: z.string(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type RegisterFormSchema = z.infer<typeof registerFormSchema>;

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
] as const;
