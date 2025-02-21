"use client";

import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { AppRoutes, SiteApiRoutes } from "@/constants/routes";
import { getApiError } from "@/lib/utils";
import { axiosSiteInstance } from "@/services/instance";
import { Error } from "@/shared/components/shared";
import {
  FormButton,
  FormFields,
  FormTextLink,
  RememberMeCheckbox,
} from "@/shared/components/shared/formPieces";
import { Form } from "@/shared/components/ui/shadcn";
import { authStore } from "@/shared/store/authStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";

import { loginFormFields, loginFormSchema, LoginFormSchema } from "./constants";

interface Props {
  className?: string;
}

export const LoginForm: FC<Props> = observer(({ className }) => {
  const queryClient = useQueryClient();

  const [isLogining, setIsLogining] = useState(false);

  const { replace } = useRouter();

  const form = useForm<LoginFormSchema>({
    mode: "onChange",
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const serverError = form.formState.errors.root;

  const onSubmit: SubmitHandler<LoginFormSchema> = async (data) => {
    try {
      setIsLogining(true);
      await axiosSiteInstance.post(SiteApiRoutes.LOGIN, {
        ...data,
        isRememberMe: authStore.isRememberMe,
      });
      await Promise.all([
        authStore.checkAuth(),
        queryClient.refetchQueries({ queryKey: ["likedGames"] }),
        queryClient.refetchQueries({ queryKey: ["games"] }),
      ]);
      replace("/");
    } catch (error) {
      const { errorField, errorMessage } = getApiError(error);
      form.setError(errorField, { message: errorMessage });
    } finally {
      setIsLogining(false);
    }
  };
  return (
    <Form {...form}>
      <form
        role="login"
        action="/login"
        autoComplete="on"
        className="flex flex-col gap-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {serverError && <Error>{serverError.message}</Error>}
        <FormFields
          fields={loginFormFields}
          form={form}
          className={className}
        />
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
});
