import {
  Container,
  FormActions,
  FormField,
  FormFields,
  LoginLinks,
} from "@/shared/components/shared";
import { FormFieldProps } from "@/shared/components/shared/formField";

export default function Page() {
  const registerFormFields: FormFieldProps[] = [
    {
      id: "registerName",
      placeholder: "Type your name",
      type: "text",
      label: "Name",
    },
    {
      id: "registerEmail",
      placeholder: "Type your email",
      type: "email",
      label: "Email",
    },
    {
      id: "registerPassword",
      placeholder: "Type your password",
      type: "password",
      label: "Password",
    },
    {
      id: "registerConfirmPassword",
      placeholder: "Confirm your password",
      type: "password",
      label: "Confirm Password",
    },
  ];
  return (
    <section className="w-full h-full bg-secondary-foreground">
      <Container className="py-14 w-3/4 lg:w-[900px]">
        <h2 className="text-[28px] font-medium text-center">Register</h2>
        <div className="pt-14">
          <LoginLinks />
          <form
            role="login"
            action="/login"
            autoComplete="off"
            className="flex flex-col gap-6"
          >
            <FormFields>
              {registerFormFields.map((field) => (
                <FormField
                  key={field.id}
                  id={field.id}
                  placeholder={field.placeholder}
                  type={field.type}
                  label={field.label}
                />
              ))}
            </FormFields>
            <FormActions
              linkText="Already registered?"
              linkHref="/login"
              buttonText="Register"
            />
          </form>
        </div>
      </Container>
    </section>
  );
}
