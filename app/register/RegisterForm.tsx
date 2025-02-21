"use client";

import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { AppRoutes, SiteApiRoutes } from '@/constants/routes';
import { getApiError } from '@/lib/utils';
import { axiosSiteInstance } from '@/services/instance';
import { SiteApi } from '@/services/siteApi/apiClient';
import { Error } from '@/shared/components/shared';
import { FormButton, FormFields, FormTextLink } from '@/shared/components/shared/formPieces';
import { Form } from '@/shared/components/ui/shadcn';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';

import { registerFormFields, registerFormSchema, RegisterFormSchema } from './constants';

interface Props {
  className?: string;
}

export const RegisterForm: FC<Props> = ({ className }) => {
  const queryClient = useQueryClient();
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
      const isEmailExist = await SiteApi.users.checkIfEmailExist(data.email);
      if (isEmailExist) {
        setError("email", {
          message: "User with this email already exists",
        });
        return;
      }
      await axiosSiteInstance.post(SiteApiRoutes.REGISTER, {
        name: data.name,
        email: data.email,
        password: data.password,
      });
      await axiosSiteInstance.post(SiteApiRoutes.LOGIN, {
        email: data.email,
        password: data.password,
        isRememberMe: true,
      });
      await queryClient.invalidateQueries({ queryKey: ["likedGames"] });
      replace("/");
    } catch (error) {
      const { errorField, errorMessage } = getApiError(error);
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
          <FormButton disabled={isCheckingData}>register</FormButton>
        </div>
      </form>
    </Form>
  );
};
