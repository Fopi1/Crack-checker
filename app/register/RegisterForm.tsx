"use client";

import { FC, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormActions, FormFields } from "@/shared/components/shared";
import { axiosSiteInstance } from "@/services/instance";
import { ApiRoutes } from "@/services/siteApi/constants";
import { SiteApi } from "@/services/siteApi/apiClient";
import { useRouter } from "next/navigation";
import { registerFormFields } from "./constant";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui";
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

export type registerFormSchema = z.infer<typeof formSchema>;

export const RegisterForm: FC<Props> = ({ className }) => {
  const [isCheckingData, setIsCheckingData] = useState(false);
  const { replace } = useRouter();
  const form = useForm<registerFormSchema>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const { setError, clearErrors } = form;

  const password = form.watch("password");
  const confirmPassword = form.watch("confirmPassword");

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

  const onSubmit: SubmitHandler<registerFormSchema> = async (data) => {
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
      const { confirmPassword: _, ...filteredData } = data;
      console.debug("Registering");
      await axiosSiteInstance.post(ApiRoutes.REGISTER, filteredData);
      console.debug("Logining");
      await axiosSiteInstance.post(ApiRoutes.LOGIN, {
        email: filteredData.email,
        password: filteredData.password,
      });
      replace("/");
      console.debug("The user has been successfully registered");
    } catch (error) {
      console.error(error);
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
        <FormFields className={className}>
          {registerFormFields.map((registerField) => (
            <FormField
              key={registerField.name}
              control={form.control}
              name={registerField.name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{registerField.label}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={registerField.placeholder}
                      type={registerField.type}
                      autoComplete="on"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </FormFields>
        <FormActions
          buttonText="Register"
          linkHref="/"
          linkText="Already registered?"
          buttonDisabled={isCheckingData}
        />
      </form>
    </Form>
  );
};
