import { AuthLinks } from "@/shared/components/page/auth";
import { Container } from "@/shared/components/shared";

import { RegisterForm } from "./registerForm";

export default function Register() {
  return (
    <section className="w-full h-full bg-secondary-foreground">
      <Container className="py-14 w-3/4 lg:w-[900px]">
        <h2 className="text-[28px] font-medium text-center">Register</h2>
        <div className="pt-14">
          <AuthLinks />
          <RegisterForm />
        </div>
      </Container>
    </section>
  );
}
