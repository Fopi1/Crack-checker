import { z } from 'zod';

import { FormFieldsLength } from '@/constants';
import { FieldProps } from '@/types/form';

const { minLength: minNameLength, maxLength: maxNameLength } =
  FormFieldsLength.name;

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
];
