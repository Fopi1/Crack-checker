import { HTMLInputTypeAttribute } from "react";
import { RegisterOptions } from "react-hook-form";
import { registerFormSchema } from "./RegisterForm";

export const minNameLength = 2;
export const maxNameLength = 20;

export const registerFormFields: Array<{
  name: keyof registerFormSchema;
  placeholder: string;
  type: HTMLInputTypeAttribute;
  label: string;
  registerValidate?: RegisterOptions<
    registerFormSchema,
    keyof registerFormSchema
  >;
}> = [
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
