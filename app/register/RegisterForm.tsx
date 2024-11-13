"use client";

import { FC, HTMLInputTypeAttribute, useEffect } from "react";
import { RegisterOptions, SubmitHandler, useForm } from "react-hook-form";
import { FormActions, FormField, FormFields } from "@/shared/components/shared";
import { SiteApi } from "@/shared/services/siteApi/apiClient";
import { axiosSiteInstance } from "@/shared/services/instance";
import { ApiRoutes } from "@/shared/services/siteApi/constants";

interface Props {
  className?: string;
}

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const RegisterForm: FC<Props> = ({ className }) => {
  const registerFormFields: Array<{
    name: keyof Inputs;
    placeholder: string;
    type: HTMLInputTypeAttribute;
    label: string;
    registerValidate?: RegisterOptions<Inputs, keyof Inputs>;
  }> = [
    {
      name: "name",
      placeholder: "Type your name",
      type: "text",
      label: "Name",
      registerValidate: {
        pattern: {
          value: /^[a-zA-Z0-9]{2,30}$/,
          message: "Your name must contain only latin letters and numbers",
        },
        minLength: {
          value: 2,
          message: `Usernames can be 2 to 20 characters long.`,
        },
        maxLength: {
          value: 30,
          message: `Usernames can be 2 to 20 characters long.`,
        },
      },
    },
    {
      name: "email",
      placeholder: "Type your email",
      type: "email",
      label: "Email",
      registerValidate: {
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
          message: "Invalid email address",
        },
      },
    },
    {
      name: "password",
      placeholder: "Type your password",
      type: "password",
      label: "Password",
      registerValidate: {
        minLength: {
          value: 8,
          message: "Passwords must at least 8 characters long.",
        },
      },
    },
    {
      name: "confirmPassword",
      placeholder: "Confirm your password",
      type: "password",
      label: "Confirm Password",
      registerValidate: {
        validate: (value: string) =>
          value === password || "Password doesn't match",
      },
    },
  ];
  const { register, handleSubmit, formState, watch, reset } = useForm<Inputs>({
    mode: "onChange",
  });
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const { confirmPassword: _, ...filteredData } = data;
      const response = await axiosSiteInstance.post(
        ApiRoutes.USERS,
        filteredData
      );

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const password = watch("password");
  useEffect(() => {
    const thisPassword = "dsdsdsds";
    reset({
      name: "ds",
      email: "F@ds.ru",
      password: thisPassword,
      confirmPassword: thisPassword,
    });
  }, [reset]);
  return (
    <form
      role="register"
      action="/register"
      autoComplete="on"
      className="flex flex-col gap-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormFields className={className}>
        {registerFormFields.map((field) => (
          <FormField
            key={field.name}
            id={field.name}
            placeholder={field.placeholder}
            type={field.type}
            label={field.label}
            autoComplete="on"
            error={formState.errors[field.name]?.message}
            {...register(field.name, {
              required: true,
              ...field.registerValidate,
            })}
          />
        ))}
      </FormFields>
      <FormActions
        linkText="Already registered?"
        linkHref="/login"
        buttonText="Register"
      />
    </form>
  );
};
