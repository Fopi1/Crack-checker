"use client";

import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { AppRoutes } from '@/constants/routes';
import { SiteApi } from '@/services/siteApi/apiClient';
import { Form } from '@/shadcn/components/ui';
import { Error } from '@/shared/components/shared';
import {
    FormButton, FormFields, FormTextLink, RememberMeCheckbox
} from '@/shared/components/shared/formPieces';
import { authStore } from '@/shared/store/authStore';
import { getApiFormError } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';

import { loginFormFields, loginFormSchema, LoginFormSchema } from './constants';

export const LoginForm = observer(() => {
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
      await SiteApi.auth.loginUser(data);
      await authStore.checkAuth();
      replace("/");
    } catch (error) {
      const { errorField, errorMessage } = getApiFormError(error);
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
});
