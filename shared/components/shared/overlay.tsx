"use client";

import { observer } from "mobx-react-lite";
import { MouseEvent, PropsWithChildren, useEffect } from "react";

import { overlayStore } from "@/shared/store/overlayStore";

export const Overlay = observer(({ children }: PropsWithChildren) => {
  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && overlayStore.onOverlayClick) {
      overlayStore.onOverlayClick();
    }
  };
  return overlayStore.isAppeared ? (
    <div
      className="fixed inset-0 z-[3] bg-black opacity-50"
      onClick={handleOverlayClick}
    >
      {children}
    </div>
  ) : (
    <>{children}</>
  );
});
