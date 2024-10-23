"use client";

import { FC, useState } from "react";
import { Container } from "./container";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png";
import { cn } from "@/lib/utils";
import { NavLinks } from "./navLinks";
import { AlignJustify, Search } from "lucide-react";

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
        "uppercase bg-slate-900 sticky top-0 shadow-2xl z-10 text-wrap",
        className
      )}
    >
      <nav className="relative">
        <Container className="flex justify-between items-center p-2 responsive">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center">
              <Image src={logo} alt="Logo" width={80} height={80}></Image>
              <h1 className="font-black text-2xl">CrackChecker</h1>
            </Link>
            <form
              role="search"
              action="/search"
              className="rounded-2xl bg-[#0b1320] flex items-center overflow-hidden w-[300px] h-[56px]"
            >
              <label htmlFor="search-input" className="py-3 px-4">
                <Search size={20} strokeWidth={3} />
              </label>
              <input
                type="text"
                id="search-input"
                placeholder="Type game name to search"
                className="bg-[#13162b] rounded-2xl w-full px-3 focus:outline-none h-10 mr-2 placeholder:text-sm placeholder:text-[#5b6271]"
              />
            </form>
          </div>
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
          <div className="leading-[21px] pr-10 hidden lg:flex gap-10">
            <NavLinks />
          </div>
        </Container>
      </nav>
    </header>
  );
};
