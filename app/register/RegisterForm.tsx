"use client";

import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { axiosSiteInstance } from '@/services/instance';
import { SiteApi } from '@/services/siteApi/apiClient';
import { ApiRoutes } from '@/services/siteApi/constants';
import { FormActions, FormFields } from '@/shared/components/formPieces';
import { Form } from '@/shared/components/ui/shadcn';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';

import { registerFormFields } from './constant';

interface Props {
  className?: string;
}

const formSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "Username must be at least 2 characters" })
      .max(20, { message: "Username must be less than 20 characters long" })
      .regex(/^[a-zA-Z0-9_]+$/, {
        message: "Username must contain only Latin letters and numbers",
      }),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, { message: "The password field must be at least 8 characters." }),
    confirmPassword: z.string(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type RegisterFormSchema = z.infer<typeof formSchema>;

export const RegisterForm: FC<Props> = ({ className }) => {
  const queryClient = useQueryClient();
  const [isCheckingData, setIsCheckingData] = useState(false);
  const [serverError, setServerError] = useState<string>("");
  const { replace } = useRouter();

  const form = useForm<RegisterFormSchema>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const { watch, setError, clearErrors } = form;

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  useEffect(() => {
    if (password === confirmPassword) {
      clearErrors("confirmPassword");
    } else {
      setError("confirmPassword", {
        type: "custom",
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
          type: "custom",
          message: "User with this email already exists",
        });
        return;
      }
      await axiosSiteInstance.post(ApiRoutes.REGISTER, {
        name: data.name,
        email: data.email,
        password: data.password,
      });
      await axiosSiteInstance.post(ApiRoutes.LOGIN, {
        email: data.email,
        password: data.password,
        isRememberMe: true,
      });
      await queryClient.invalidateQueries({ queryKey: ["likedGames"] });
      replace("/");
      console.debug("The user has been successfully registered");
    } catch (error) {
      console.error("Registration error: ", error);
      setServerError("Something went wrong. Please try again later.");
    } finally {
      setIsCheckingData(false);
    }
  };
  return (
    <Form {...form}>
      <form
        role="register"
        action="/register"
        autoComplete="on"
        className="flex flex-col gap-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {serverError && <p className="text-red-500 text-sm">{serverError}</p>}
        <FormFields
          fields={registerFormFields}
          form={form}
          className={className}
        />
        <FormActions
          linkHref="/"
          linkText="Already registered?"
          buttonText="Register"
          buttonDisabled={isCheckingData}
        />
      </form>
    </Form>
  );
};
