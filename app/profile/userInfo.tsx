"use client";

import { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { SiteApiRoutes } from '@/constants';
import { getApiError } from '@/lib/utils';
import { axiosSiteInstance } from '@/services/instance';
import { FormTemplate } from '@/shared/components/page/profile/formTemplate';
import { useToast } from '@/shared/hooks/use-toast';
import { authStore } from '@/shared/store/authStore';
import { UserData } from '@/types/store';
import { zodResolver } from '@hookform/resolvers/zod';

import { userInfoFields, userInfoSchema, UserInfoSchema } from './constants';

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
        ...data,
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
