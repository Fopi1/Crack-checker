import { Container, LoginLinks } from "@/shared/components/shared";
import { Input } from "@/shared/components/ui";
import Link from "next/link";

export default function Login() {
  return (
    <section className="w-full h-full bg-secondary-foreground">
      <Container className="py-14 w-[900px]">
        <div className="">
          <span>
            <p className="inline-block">Don&apos;t have an account? </p>{" "}
            <Link
              href="/register"
              className="hover:text-[#0056b3] text-[#007bff] font-bold"
            >
              Register
            </Link>
          </span>
          <h2 className="text-[28px] font-medium text-center">Log in</h2>
          <div className="pt-14 text-center">
            <LoginLinks />
            <span className="uppercase mt-1">or</span>
            <form action="" autoComplete="off">
              <div className="flex flex-col">
                <Input />
              </div>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}
