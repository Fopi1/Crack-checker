import { ReactNode } from "react";
import { SubmitHandler, UseFormReturn } from "react-hook-form";

import { Form } from "@/shadcn/components/ui";
import { Error, FormButton, FormFields } from "@/shared/components/shared";
import { ServerError } from "@/types/components";
import { FieldProps } from "@/types/form";

interface Props<T extends Record<string, any>> {
  title: ReactNode;
  description: ReactNode;
  form: UseFormReturn<T>;
  formFields: FieldProps<T>[];
  onSubmit: SubmitHandler<T>;
  serverError: ServerError;
  isChecking: boolean;
}

export const FormTemplate = <T extends Record<string, any>>({
  title,
  description,
  form,
  onSubmit,
  serverError,
  formFields,
  isChecking = true,
}: Props<T>) => {
  return (
    <div className="w-full bg-[--background-profile] rounded-md shadow-xl">
      <div className="flex flex-col gap-3 p-6 w-[40rem]">
        <h2 className="font-medium text-lg">{title}</h2>
        <p className="font-normal text-sm">{description}</p>
        <Form {...form}>
          <form
            role="change-info"
            action="/change-info"
            className="flex flex-col gap-5"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {serverError && <Error>{serverError.message}</Error>}
            <FormFields fields={formFields} form={form} />
            <div className="flex gap-5">
              <FormButton disabled={isChecking}>save</FormButton>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
