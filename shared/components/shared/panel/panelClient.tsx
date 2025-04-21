"use client";

import { useState } from "react";

import { SiteApiRoutes } from "@/constants";
import { SiteApi } from "@/services/apiClient";
import { SteamQueryProps } from "@/types/lib";

export const PanelClient = () => {
  const queryProps: Partial<SteamQueryProps> = {
    max_results: 10,
  };
  const [isShowed, setIsShowed] = useState(false);
  const handleClick = () => {
    setIsShowed((prevIsShowed) => !prevIsShowed);
  };
  const handleSync = async () => {
    try {
      await SiteApi.admin.trigger({ path: SiteApiRoutes.SYNC, method: "POST" });
    } catch (error) {
      console.error("Admin pidoras", error);
      throw new Error("Admin pidoras");
    }
  };

  const handleNotify = async () => {
    try {
      await SiteApi.admin.trigger({
        path: SiteApiRoutes.NOTIFY_CRACKED_GAMES,
        method: "POST",
      });
    } catch (error) {
      console.error("Admin hyesos", error);
      throw new Error("Admin hyesos");
    }
  };
  const handleSteam = async () => {
    await SiteApi.admin.trigger({
      path: SiteApiRoutes.STEAM_GAMES,
      method: "GET",
      data: queryProps,
    });
  };
  return (
    <>
      <button
        className="fixed left-3 top-3 bg-purple-600 z-[100]"
        onClick={handleClick}
      >
        {isShowed ? "Close" : "Show"}
      </button>

      <div
        className={`fixed top-0 left-0 h-screen w-36 z-[99] bg-slate-700 transition-opacity duration-300 
        ${
          isShowed
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-5 py-10 px-4">
          <button onClick={handleSync}>Sync</button>
          <button onClick={handleNotify}>Notify</button>
          <button onClick={handleSteam}>Steam</button>
        </div>
      </div>
    </>
  );
};
