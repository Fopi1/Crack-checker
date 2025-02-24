"use client";

import { observer } from "mobx-react-lite";
import Image from "next/image";
import Link from "next/link";
import { FC, useEffect, useRef, useState } from "react";

import { AppRoutes } from "@/constants/routes";
import logo from "@/public/logo.png";
import { cn } from "@/shadcn";
import { authStore } from "@/shared/store/authStore";

import { SearchForm } from "../shared/searchForm";
import { HeaderMenu } from "./headerMenu";
import { LoginedActionsButton } from "./navigation";
import { NavLinks } from "./navigation/navLinks";

interface Props {
  className?: string;
}

export const Header: FC<Props> = observer(({ className }) => {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    if (window.innerWidth >= 768) return;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const shouldHide =
        currentScrollY > lastScrollY.current && currentScrollY > 50;

      setIsVisible(!shouldHide);

      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
          <Link href={AppRoutes.MAIN} className="flex items-center">
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
          <SearchForm id="desktop-search" className="hidden lg:flex" />
          <HeaderMenu className="lg:hidden" />
        </div>
        <SearchForm id="mobile-search" className="w-full flex lg:hidden" />
        <div className="leading-[21px] pr-2 hidden gap-5 lg:flex xl:gap-10">
          <NavLinks />
          {authStore.userData && <LoginedActionsButton />}
        </div>
      </nav>
    </header>
  );
});
