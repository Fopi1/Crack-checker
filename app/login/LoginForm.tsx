"use client";

import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { axiosSiteInstance } from "@/services/instance";
import { ApiRoutes } from "@/services/siteApi/constants";
import {
  FormActions,
  FormFields,
  RememberMeCheckbox,
} from "@/shared/components/formPieces";
import { Form } from "@/shared/components/ui/shadcn";
import { authStore } from "@/shared/store/authStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";

import { loginFormFields } from "./constants";

interface Props {
  className?: string;
}

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string(),
});
export type LoginFormSchema = z.infer<typeof formSchema>;

export const LoginForm: FC<Props> = observer(({ className }) => {
  const [isLogining, setIsLogining] = useState(false);
  const queryClient = useQueryClient();
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
      setIsLogining(true);
      await axiosSiteInstance.post(ApiRoutes.LOGIN, {
        ...data,
        isRememberMe: authStore.isRememberMe,
      });
      await authStore.checkAuth();
      await queryClient.refetchQueries({ queryKey: ["likedGames"] });
      await queryClient.refetchQueries({ queryKey: ["games"] });
      replace("/");
    } catch (error) {
      console.error(error);
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
          buttonDisabled={isLogining}
        />
      </form>
    </Form>
  );
});
