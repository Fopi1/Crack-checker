import { Container, LoginLinks } from "@/shared/components/shared";
import Link from "next/link";
import { LoginForm } from "./LoginForm";

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
          {/* <LoginForm /> */}
        </div>
      </Container>
    </section>
  );
}
