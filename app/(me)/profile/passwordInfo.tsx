"use client";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { SiteApi } from "@/services/apiClient";
import { useToast } from "@/shadcn/hooks";
import { FormTemplate } from "@/shared/components/page/profile/formTemplate";
import { getApiFormError } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  passwordInfoFields,
  passwordInfoSchema,
  PasswordInfoSchema,
} from "./constants";

export const PasswordInfo = () => {
  const [isChecking, setIsChecking] = useState(false);
  const { toast } = useToast();
  const form = useForm<PasswordInfoSchema>({
    mode: "onChange",
    resolver: zodResolver(passwordInfoSchema),
    defaultValues: {
      currentPassword: "",
      password: "",
      confirmPassword: "",
    },
  });
  const serverError = form.formState.errors.root;
  const onSubmit: SubmitHandler<PasswordInfoSchema> = async (data) => {
    try {
      setIsChecking(true);
      await SiteApi.user.changeUserPassword(data);
      form.reset();
      toast({ description: "Saved." });
    } catch (error) {
      const { errorField, errorMessage } = getApiFormError(error);
      form.setError(errorField, { message: errorMessage });
    } finally {
      setIsChecking(false);
    }
  };
  return (
    <FormTemplate
      title="Update Password"
      description="Ensure your account is using a long, random password to stay secure."
      form={form}
      formFields={passwordInfoFields}
      onSubmit={onSubmit}
      serverError={serverError}
      isChecking={isChecking}
    />
  );
};
