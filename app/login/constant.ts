import { FieldProps } from "@/types/form";
import { LoginFormSchema } from "./LoginForm";

export const loginFormFields: FieldProps<LoginFormSchema>[] = [
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
];
