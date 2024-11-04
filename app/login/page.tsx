import {
  Container,
  FormActions,
  FormField,
  FormFields,
  LoginLinks,
} from "@/shared/components/shared";
import Link from "next/link";

export default function Login() {
  return (
    <section className="w-full h-full bg-secondary-foreground">
      <Container className="py-14 w-3/4 lg:w-[900px]">
        <div>
          <p className="inline-block">Don&apos;t have an account? </p>{" "}
          <Link
            href="/register"
            className="hover:text-[#0056b3] text-[#007bff] font-bold"
          >
            Register
          </Link>
        </div>
        <h2 className="text-[28px] font-medium text-center">Log in</h2>
        <div className="pt-14">
          <LoginLinks />
          <form
            role="login"
            action="/login"
            autoComplete="off"
            className="flex flex-col gap-6"
          >
            <FormFields>
              <FormField
                id="loginEmail"
                placeholder="Type your email"
                type="email"
                label="Email"
              />
              <FormField
                id="loginPassword"
                placeholder="Type your password"
                type="password"
                label="Password"
              />
            </FormFields>
            <FormActions
              loginForm
              linkText="Forgot your password?"
              linkHref="/forgot-password"
              buttonText="Log in"
            />
          </form>
        </div>
      </Container>
    </section>
  );
}
