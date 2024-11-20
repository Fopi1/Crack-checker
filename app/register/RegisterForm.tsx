"use client";

import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormActions, FormField, FormFields } from "@/shared/components/shared";
import { axiosSiteInstance } from "@/services/instance";
import { ApiRoutes } from "@/services/siteApi/constants";
import { SiteApi } from "@/services/siteApi/apiClient";
import { useRouter } from "next/navigation";
import { registerFormFields } from "./constant";

interface Props {
  className?: string;
}

export type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const RegisterForm: FC<Props> = ({ className }) => {
  const { replace } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setError,
  } = useForm<Inputs>({
    mode: "onChange",
  });
  const password = watch("password");

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!isValid) {
      return;
    }
    try {
      const isEmailExist = await SiteApi.users.checkIfEmailExist(data.email);

      if (isEmailExist) {
        setError("email", {
          type: "custom",
          message: `User with this email already exists`,
        });
        return;
      }
      const { confirmPassword: _, ...filteredData } = data;
      await axiosSiteInstance.post(ApiRoutes.REGISTER, filteredData);
      const { name: __, ...loginData } = filteredData;
      await axiosSiteInstance.post(ApiRoutes.LOGIN, loginData);
      replace("/");
      console.debug("The user has been successfully registered");
    } catch (error) {
      console.error(error);
    }
  };
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
            error={errors[field.name]?.message}
            {...register(field.name, {
              required: true,
              ...field.registerValidate,
            })}
          />
        ))}
        <FormField
          id="confirmPassword"
          placeholder="Confirm your password"
          type="password"
          label="Confirm password"
          autoComplete="on"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword", {
            required: true,
            validate: (value: string) =>
              value === password || "Password doesn't match",
          })}
        />
      </FormFields>
      <FormActions
        linkText="Already registered?"
        linkHref="/login"
        buttonText="Register"
        buttonDisabled={!isValid}
      />
    </form>
  );
};
