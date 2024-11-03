import { Container, LoginLinks } from "@/shared/components/shared";
import { Button, Checkbox, Input, Label } from "@/shared/components/ui";
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
          <div className="pt-14">
            <LoginLinks />
            <form action="" autoComplete="off" className="flex flex-col gap-4">
              <div className="flex flex-col gap-7">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    placeholder="Type your email"
                    id="password"
                    type="email"
                    className="z-[2] h-12"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    placeholder="Type your password"
                    id="password"
                    type="password"
                    className="z-[2] h-12"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Checkbox className="rounded-[2px]" id="checkbox" />
                  <Label htmlFor="checkbox">Remember me</Label>
                </div>
                <div className="flex items-center gap-5 justify-end">
                  <Link className="text-sm font-bold" href="/forgot-password">
                    Forgot your password?
                  </Link>
                  <Button className="uppercase font-semibold text-xs bg-gray-800 tracking-widest px-6">
                    log in
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}
