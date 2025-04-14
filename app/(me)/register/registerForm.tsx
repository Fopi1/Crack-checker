"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { AppRoutes } from "@/constants/routes";
import { SiteApi } from "@/services/siteApi/apiClient";
import { Form } from "@/shadcn/components/ui";
import { Error } from "@/shared/components/shared";
import {
  FormFields,
  FormTextLink,
} from "@/shared/components/shared/formPieces";
import { CrackButton } from "@/shared/components/ui";
import { getApiFormError } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  registerFormFields,
  registerFormSchema,
  RegisterFormSchema,
} from "./constants";

interface Props {
  className?: string;
}

export const RegisterForm: FC<Props> = ({ className }) => {
  const [isCheckingData, setIsCheckingData] = useState(false);
  const { replace } = useRouter();

  const form = useForm<RegisterFormSchema>({
    mode: "onChange",
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const { watch, setError, clearErrors } = form;
  const serverError = form.formState.errors.root;

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  useEffect(() => {
    if (password === confirmPassword) {
      clearErrors("confirmPassword");
    } else {
      setError("confirmPassword", {
        message: "Passwords don't match",
      });
    }
  }, [password, confirmPassword, setError, clearErrors]);

  const onSubmit: SubmitHandler<RegisterFormSchema> = async (data) => {
    try {
      setIsCheckingData(true);
      await SiteApi.auth.registerUser(data);
      const loginData = {
        email: data.email,
        password: data.password,
      };
      await signIn("credentials", { ...loginData, redirect: false });
      replace("/");
    } catch (error) {
      const { errorField, errorMessage } = getApiFormError(error);
      setError(errorField, { message: errorMessage });
    } finally {
      setIsCheckingData(false);
    }
  };
  return (
    <Form {...form}>
      <form
        role="register"
        action="/register"
        className="flex flex-col gap-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {serverError && <Error>{serverError.message}</Error>}
        <FormFields
          fields={registerFormFields}
          form={form}
          className={className}
        />
        <div className="flex items-center gap-5 justify-end">
          <FormTextLink href={AppRoutes.LOGIN}>
            alreadry registered?
          </FormTextLink>
          <CrackButton type="submit" disabled={isCheckingData}>
            register
          </CrackButton>
        </div>
      </form>
    </Form>
  );
};
