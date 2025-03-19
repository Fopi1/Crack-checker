import Link from "next/link";

import { AuthLinks } from "@/shared/components/page/auth";
import { Container } from "@/shared/components/shared";

import { LoginForm } from "./loginForm";

export default function Login() {
  return (
    <section className="w-full h-full bg-secondary-foreground">
      <Container className="py-14 w-3/4 lg:w-[900px]">
        <div>
          <p className="inline-block">{"Don't have an account?"} </p>
          <Link
            href="/register"
            className="hover:text-[#0056b3] text-[#007bff] font-bold"
          >
            {" Register"}
          </Link>
        </div>
        <h2 className="text-[28px] font-medium text-center">Log in</h2>
        <div className="pt-14">
          <AuthLinks />
          <LoginForm />
        </div>
      </Container>
    </section>
  );
}
