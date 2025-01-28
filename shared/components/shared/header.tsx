"use client";

import { observer } from "mobx-react-lite";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import logo from "@/public/logo.png";
import { componentStore } from "@/shared/store/componentsStore";

import { HeaderMenu } from "./headerMenu";
import { NavLinks } from "./navLinks";
import { SearchForm } from "./searchForm";

interface Props {
  className?: string;
}

export const Header: FC<Props> = observer(({ className }) => {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    componentStore.setIsOpened(false);
  }, [pathname]);

  useEffect(() => {
    if (window.innerWidth >= 768) return;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const shouldHide = currentScrollY > lastScrollY && currentScrollY > 50;

      setIsVisible(!shouldHide);

      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={cn(
        "uppercase bg-slate-900 sticky top-0 shadow-2xl z-30 text-wrap transition-transform duration-300",
        isVisible ? "translate-y-0" : "-translate-y-full",
        className
      )}
    >
      <nav className="relative mx-auto flex justify-between items-center p-2 responsive flex-col lg:flex-row">
        <div className="flex items-center justify-between w-full gap-2 lg:justify-normal lg:w-auto xl:gap-6">
          <Link href="/" className="flex items-center">
            <Image
              priority
              src={logo}
              alt="Logo"
              width={80}
              height={80}
            ></Image>
            <h1 className="text-base font-black hidden md:inline-block 2xl:text-2xl">
              CrackChecker
            </h1>
          </Link>
          <SearchForm className="hidden lg:flex" />
          <HeaderMenu className="lg:hidden" />
        </div>
        <SearchForm className="w-full flex lg:hidden" />
        <div className="leading-[21px] pr-2 hidden gap-5 lg:flex xl:gap-10">
          <NavLinks />
        </div>
      </nav>
    </header>
  );
});
