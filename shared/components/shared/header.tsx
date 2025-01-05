"use client";

import { FC, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png";
import { cn } from "@/lib/utils";
import { NavLinks } from "./navLinks";
import { usePathname } from "next/navigation";
import { SearchForm } from "./searchForm";
import { HeaderMenu } from "./headerMenu";
import { componentStore } from "@/shared/store/componentsStore";
import { observer } from "mobx-react-lite";

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
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };
    if (window.innerWidth < 768) {
      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
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
