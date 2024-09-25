"use client";

import { FC, useState } from "react";
import { Container } from "./container";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png";
import { cn } from "@/lib/utils";
import { NavLinks } from "./nav-links";
import { AlignJustify } from "lucide-react";

interface Props {
  className?: string;
}

export const Header: FC<Props> = ({ className }) => {
  const [isOpened, setIsOpened] = useState(false);
  const handleSetIsOpened = () => {
    setIsOpened((prevState) => !prevState);
  };

  return (
    <header
      className={cn(
        "uppercase bg-slate-900 sticky top-0 shadow-2xl z-[1] text-wrap",
        className
      )}
    >
      <nav className="relative h-full">
        <Container className="flex justify-between items-center p-2 responsive">
          <Link href="/" className="flex items-center">
            <Image src={logo} alt="Logo" width={70} height={70}></Image>
            <h1 className="font-black text-xl">CrackChecker</h1>
          </Link>
          <div className="lg:hidden cursor-pointer">
            <button
              aria-label="Toggle Navigation"
              aria-expanded={isOpened}
              onClick={handleSetIsOpened}
              className="text-[color:--text-secondary]"
            >
              <AlignJustify />
            </button>
            {isOpened && (
              <div className="absolute bg-gray-900 left-0 top-[100%] w-full">
                <div className="flex flex-col">
                  <NavLinks className="p-6 transition-transform duration-300 ease-in-out hover:bg-violet-950" />
                </div>
              </div>
            )}
          </div>
          <div className="hidden lg:flex gap-10">
            <NavLinks />
          </div>
        </Container>
      </nav>
    </header>
  );
};
