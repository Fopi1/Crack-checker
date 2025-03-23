"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { AppRoutes } from "@/constants/routes";
import { Form } from "@/shadcn/components/ui";
import { Error } from "@/shared/components/shared";
import {
  FormButton,
  FormFields,
  FormTextLink,
  RememberMeCheckbox,
} from "@/shared/components/shared/formPieces";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginFormFields, loginFormSchema, LoginFormSchema } from "./constants";

export const LoginForm = () => {
  const [isLogining, setIsLogining] = useState(false);
  const [error, setError] = useState("");
  const { replace } = useRouter();

  const form = useForm<LoginFormSchema>({
    mode: "onChange",
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginFormSchema> = async (data) => {
    setIsLogining(true);
    const result = await signIn("credentials", { ...data, redirect: false });
    if (result?.error) {
      setError(`Ошибка входа: ${result.error}`);
    } else {
      replace(AppRoutes.MAIN);
    }
    setIsLogining(false);
  };
  return (
    <Form {...form}>
      <form
        role="login"
        className="flex flex-col gap-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {error && <Error>{error}</Error>}
        <FormFields fields={loginFormFields} form={form} />
        <RememberMeCheckbox />
        <div className="flex items-center gap-5 justify-end">
          <FormTextLink href={AppRoutes.FORGOT_PASSWORD}>
            forgot your password?
          </FormTextLink>
          <FormButton disabled={isLogining}>log in</FormButton>
        </div>
      </form>
    </Form>
  );
};
