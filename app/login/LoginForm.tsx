import { FormActions, FormField, FormFields } from "@/shared/components/shared";
import { FC } from "react";

interface Props {
  className?: string;
}

export const LoginForm: FC<Props> = ({ className }) => {
  return (
    <form
      role="login"
      action="/login"
      autoComplete="on"
      className="flex flex-col gap-6"
    >
      <FormFields className={className}>
        <FormField
          id="email"
          placeholder="Type your email"
          type="email"
          label="Email"
        />
        <FormField
          id="password"
          placeholder="Type your password"
          type="password"
          label="Password"
          autoComplete="on"
        />
      </FormFields>
      <FormActions
        loginForm
        linkText="Forgot your password?"
        linkHref="/forgot-password"
        buttonText="Log in"
      />
    </form>
  );
};
