import { Container, LoginLinks } from "@/shared/components/shared";
import { RegisterForm } from "./RegisterForm";

export default function Register() {
  return (
    <section className="w-full h-full bg-secondary-foreground">
      <Container className="py-14 w-3/4 lg:w-[900px]">
        <h2 className="text-[28px] font-medium text-center">Register</h2>
        <div className="pt-14">
          <LoginLinks />
          <RegisterForm />
        </div>
      </Container>
    </section>
  );
}
