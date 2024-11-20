import { HTMLInputTypeAttribute } from "react";
import { RegisterOptions } from "react-hook-form";
import { Inputs } from "./RegisterForm";

export const minNameLength = 2;
export const maxNameLength = 20;

export const registerFormFields: Array<{
  name: keyof Inputs;
  placeholder: string;
  type: HTMLInputTypeAttribute;
  label: string;
  registerValidate?: RegisterOptions<Inputs, keyof Inputs>;
}> = [
  {
    name: "name",
    placeholder: "Type your name",
    type: "text",
    label: "Name",
    registerValidate: {
      pattern: {
        value: /^[a-zA-Z0-9]*$/,
        message: "Your name must contain only latin letters and numbers",
      },

      minLength: {
        value: minNameLength,
        message: `Usernames can be ${minNameLength} to ${maxNameLength} characters long.`,
      },
      maxLength: {
        value: maxNameLength,
        message: `Usernames can be ${minNameLength} to ${maxNameLength} characters long.`,
      },
    },
  },
  {
    name: "email",
    placeholder: "Type your email",
    type: "email",
    label: "Email",
    registerValidate: {
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: "Invalid email address",
      },
    },
  },
  {
    name: "password",
    placeholder: "Type your password",
    type: "password",
    label: "Password",
    registerValidate: {
      minLength: {
        value: 8,
        message: "Passwords must at least 8 characters long.",
      },
    },
  },
];
