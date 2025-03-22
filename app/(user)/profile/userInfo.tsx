"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { SiteApi } from "@/services/siteApi/apiClient";
import { useToast } from "@/shadcn/hooks";
import { FormTemplate } from "@/shared/components/page/profile/formTemplate";
import { getApiFormError } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";

import { userInfoFields, userInfoSchema, UserInfoSchema } from "./constants";

export const UserInfo = () => {
  const [isChecking, setIsChecking] = useState(false);
  const { toast } = useToast();
  const { data: session, update } = useSession();

  const name = session && session.user.name ? session.user.name : "";
  const email = session && session.user.email ? session.user.email : "";

  const form = useForm<UserInfoSchema>({
    mode: "onChange",
    resolver: zodResolver(userInfoSchema),
    defaultValues: { name, email },
  });
  const serverError = form.formState.errors.root;
  const onSubmit: SubmitHandler<UserInfoSchema> = async (data) => {
    try {
      setIsChecking(true);
      const response = await SiteApi.users.changeUserInfo(data);
      const updatedUser = response.data.user;

      await update({
        name: updatedUser.name,
        email: updatedUser.email,
      });
      console.log(`name: ${name}`);
      console.log(`email: ${email}`);
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
      title="Profile Information"
      description={
        "Update your account's profile information and email address."
      }
      form={form}
      formFields={userInfoFields}
      onSubmit={onSubmit}
      serverError={serverError}
      isChecking={isChecking}
    />
  );
};
