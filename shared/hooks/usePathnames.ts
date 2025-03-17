import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export const usePathnames = () => {
  const newPathname = usePathname();
  const oldPathnameRef = useRef(newPathname);
  useEffect(() => {
    oldPathnameRef.current = newPathname;
  }, [newPathname]);
  return { newPathname, oldPathname: oldPathnameRef.current };
};
