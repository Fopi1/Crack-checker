import { FC } from "react";
import { Container } from "../container";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png";
import { cn } from "@/lib/utils";
import { DesktopWrapper } from "./desktop-wrapper";
import { MobileWrapepr } from "./mobile-wrapper";

interface Props {
  className?: string;
}

export const Header: FC<Props> = ({ className }) => {
  return (
    <header
      className={cn(
        "uppercase bg-slate-900 sticky top-0 shadow-2xl z-[1] text-wrap",
        className
      )}
    >
      <Container className="flex justify-between items-center p-2 responsive">
        <Link href="/" className="flex items-center">
          <Image src={logo} alt="Logo" width={70} height={70}></Image>
          <h1 className="font-black text-xl">CrackCheck</h1>
        </Link>
        <MobileWrapepr />
      </Container>
    </header>
  );
};
