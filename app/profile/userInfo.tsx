"use client";

import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { SiteApiRoutes } from "@/constants";
import { getApiError } from "@/lib/utils";
import { axiosSiteInstance } from "@/services/instance";
import { Error, FormButton, FormFields } from "@/shared/components/shared";
import { Form } from "@/shared/components/ui/shadcn";
import { useToast } from "@/shared/hooks/use-toast";
import { authStore } from "@/shared/store/authStore";
import { UserData } from "@/types/store";
import { zodResolver } from "@hookform/resolvers/zod";

import { userInfoFields, userInfoSchema, UserInfoSchema } from "./constants";

interface Props {
  userData: UserData;
}

export const UserInfo: FC<Props> = ({ userData }) => {
  const [isChecking, setIsChecking] = useState(false);
  const { toast } = useToast();
  const form = useForm<UserInfoSchema>({
    mode: "onChange",
    resolver: zodResolver(userInfoSchema),
    defaultValues: { name: userData?.name, email: userData?.email },
  });
  const serverError = form.formState.errors.root;
  const onSubmit: SubmitHandler<UserInfoSchema> = async (data) => {
    try {
      setIsChecking(true);
      await axiosSiteInstance.put(SiteApiRoutes.USER, {
        email: data.email,
        name: data.name,
      });
      authStore.checkAuth();
      toast({ description: "Saved." });
    } catch (error) {
      const { errorField, errorMessage } = getApiError(error);
      form.setError(errorField, { message: errorMessage });
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="w-full bg-[--background-profile] rounded-md shadow-xl">
      <div className="flex flex-col gap-3 p-6">
        <h2 className="font-medium text-lg">Profile Information</h2>
        <p className="font-normal text-sm">
          {"Update your account's profile information and email address."}
        </p>
        <Form {...form}>
          <form
            role="change-base-info"
            action="/change-base-info"
            className="flex flex-col gap-5"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {serverError && <Error>{serverError.message}</Error>}
            <FormFields fields={userInfoFields} form={form} className="w-96" />
            <div className="flex gap-5">
              <FormButton disabled={isChecking}>save</FormButton>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
