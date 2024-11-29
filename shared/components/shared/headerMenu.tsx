import { AlignJustify } from "lucide-react";
import { NavLinks } from "./navLinks";
import { componentStore } from "@/shared/store/componentsStore";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { observer } from "mobx-react-lite";

interface Props {
  className?: string;
}

export const HeaderMenu = observer(({ className }: Props) => {
  const menuRef = useRef<HTMLDivElement>(null);

  const handleSetIsOpened = () => {
    componentStore.setIsOpened(!componentStore.isOpened);
  };

  return (
    <div className={cn("cursor-pointer lg:hidden", className)}>
      <button
        onClick={handleSetIsOpened}
        className="text-[color:--text-secondary]"
      >
        <AlignJustify />
      </button>
      {componentStore.isOpened && (
        <div
          ref={menuRef}
          className="absolute bg-gray-900 left-0 top-[100%] w-full"
        >
          <div className="flex flex-col">
            <NavLinks className="p-6 transition-transform duration-300 ease-in-out hover:bg-violet-950" />
          </div>
        </div>
      )}
    </div>
  );
});
