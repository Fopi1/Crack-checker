"use client";

import {
  FormActions,
  FormFields,
  RememberMeCheckbox,
} from "@/shared/components/shared";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Form } from "@/shared/components/ui/form";
import { z } from "zod";
import { loginFormFields } from "./constant";
import { axiosSiteInstance } from "@/services/instance";
import { ApiRoutes } from "@/services/siteApi/constants";
import { useRouter } from "next/navigation";
import { authStore } from "@/shared/store/authStore";
import { observer } from "mobx-react-lite";

interface Props {
  className?: string;
}

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string(),
});
export type LoginFormSchema = z.infer<typeof formSchema>;

export const LoginForm: FC<Props> = observer(({ className }) => {
  const { replace } = useRouter();
  const form = useForm<LoginFormSchema>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginFormSchema> = async (data) => {
    try {
      await axiosSiteInstance.post(ApiRoutes.LOGIN, {
        ...data,
        isRememberMe: authStore.isRememberMe,
      });
      replace("/");
    } catch (error) {
      console.error(error);
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
        <FormFields
          fields={loginFormFields}
          form={form}
          className={className}
        />
        <RememberMeCheckbox />
        <FormActions
          buttonText="Log in"
          linkHref="/forgot-password"
          linkText="Forgot your password?"
        />
      </form>
    </Form>
  );
});
