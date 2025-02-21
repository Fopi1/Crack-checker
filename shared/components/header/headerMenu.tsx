"use client";

import { AlignJustify } from "lucide-react";
import { observer } from "mobx-react-lite";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";

import { cn } from "@/lib/utils";
import { componentStore } from "@/shared/store/componentsStore";

import { NavLinks } from "./navigation/navLinks";

interface Props {
  className?: string;
}

export const HeaderMenu = observer(({ className }: Props) => {
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  const handleToggleIsOpened = () => {
    componentStore.toggleIsOpened();
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target as Node) &&
      componentStore.isOpened
    ) {
      componentStore.setIsOpened(false);
    }
  }, []);

  useEffect(() => {
    if (componentStore.isOpened) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  useEffect(() => {
    componentStore.setIsOpened(false);
  }, [pathname]);

  return (
    <div className={cn("cursor-pointer", className)}>
      <button
        onClick={handleToggleIsOpened}
        className="text-[color:--text-secondary]"
      >
        <AlignJustify />
      </button>

      {componentStore.isOpened && (
        <>
          <div
            className="fixed h-lvh inset-0 z-10"
            onClick={() => componentStore.setIsOpened(false)}
          />
          <div
            ref={menuRef}
            className="absolute bg-gray-900 z-20 left-0 top-[100%] w-full"
          >
            <div className="flex flex-col">
              <NavLinks className="p-6 transition-transform duration-300 ease-in-out hover:bg-violet-950" />
            </div>
          </div>
        </>
      )}
    </div>
  );
});
