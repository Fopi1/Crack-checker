import { z } from "zod";

import { FormFieldsLength } from "@/constants";
import { FieldProps } from "@/types/form";

const { minLength: minNameLength, maxLength: maxNameLength } =
  FormFieldsLength.name;

const { minLength: minPasswordLength } = FormFieldsLength.password;

// UserInfo
export const userInfoSchema = z.object({
  name: z
    .string()
    .trim()
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
});

export type UserInfoSchema = z.infer<typeof userInfoSchema>;

export const userInfoFields: FieldProps<UserInfoSchema>[] = [
  {
    name: "name",
    placeholder: "",
    type: "string",
    label: "Name",
  },
  { name: "email", placeholder: "", type: "email", label: "Email" },
] as const;

// PasswordInfo

export const passwordInfoSchema = z
  .object({
    currentPassword: z.string().min(minPasswordLength, {
      message: `The new password must not be less than ${minPasswordLength} characters in length.`,
    }),
    password: z.string().min(minPasswordLength, {
      message: `New password must be at least ${minPasswordLength} characters.`,
    }),
    confirmPassword: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
    if (data.password === data.currentPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "New password must be different from the current password",
        path: ["password"],
      });
    }
  });

export type PasswordInfoSchema = z.infer<typeof passwordInfoSchema>;

export const passwordInfoFields: FieldProps<PasswordInfoSchema>[] = [
  {
    name: "currentPassword",
    placeholder: "",
    type: "string",
    label: "Current Password",
    autocomplete: "current-password",
  },
  {
    name: "password",
    placeholder: "",
    type: "string",
    label: "New Password",
    autocomplete: "new-password",
  },
  {
    name: "confirmPassword",
    placeholder: "",
    type: "string",
    label: "Confirm Password",
    autocomplete: "new-password",
  },
] as const;
