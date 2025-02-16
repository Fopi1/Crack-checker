"use client";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { SiteApiRoutes } from "@/routes";
import { axiosSiteInstance } from "@/services/instance";
import { Container, FormButton, FormFields } from "@/shared/components/shared";
import { Form } from "@/shared/components/ui/shadcn";
import { authStore } from "@/shared/store/authStore";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  baseInfoFormFields,
  baseInfoFormSchema,
  BaseInfoFormSchema,
} from "./constants";

interface Props {
  userData: {
    id: number;
    name: string;
    email: string;
  } | null;
}

export default function ProfileClient({ userData }: Props) {
  const [isChecking, setIsChecking] = useState(false);
  const form = useForm<BaseInfoFormSchema>({
    mode: "onChange",
    resolver: zodResolver(baseInfoFormSchema),
    defaultValues: { name: userData?.name, email: userData?.email },
  });

  const onSubmit: SubmitHandler<BaseInfoFormSchema> = async (data) => {
    try {
      setIsChecking(true);
      await axiosSiteInstance.put(SiteApiRoutes.USER, {
        email: userData?.email,
        changeData: { email: data.email, name: data.name },
      });
      await authStore.checkAuth();
    } catch (error) {
      console.error(error.response.data.error);
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <section className="bg-secondary-foreground">
      <Container className="py-10">
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
                <FormFields
                  fields={baseInfoFormFields}
                  form={form}
                  className="w-96"
                />
                <div>
                  <FormButton disabled={isChecking}>save</FormButton>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </Container>
    </section>
  );
}
