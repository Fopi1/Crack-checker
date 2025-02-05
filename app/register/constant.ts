import { FieldProps } from "@/types/form";

import { RegisterFormSchema } from "./registerForm";

export const minNameLength = 2;
export const maxNameLength = 20;

export const registerFormFields: FieldProps<RegisterFormSchema>[] = [
  {
    name: "name",
    placeholder: "Type your name",
    type: "text",
    label: "Name",
  },
  {
    name: "email",
    placeholder: "Type your email",
    type: "email",
    label: "Email",
  },
  {
    name: "password",
    placeholder: "Type your password",
    type: "password",
    label: "Password",
  },
  {
    name: "confirmPassword",
    placeholder: "Confirm your password",
    type: "password",
    label: "Confirm Password",
  },
];
