"use client";

import { useState } from "react";

import { SiteApi } from "@/services/siteApi/apiClient";

export const PanelClient = () => {
  const [isShowed, setIsShowed] = useState(false);
  const handleClick = () => {
    setIsShowed((prevIsShowed) => !prevIsShowed);
  };
  const handleSync = async () => {
    try {
      await SiteApi.admin.syncTrigger();
    } catch (error) {
      console.error("Admin pidoras");
      throw new Error("Admin pidoras");
    }
  };

  const handleNotify = async () => {
    try {
      await SiteApi.admin.notifyCrackedGames();
    } catch (error) {
      console.error("Admin hyesos");
      throw new Error("Admin hyesos");
    }
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
        </div>
      </div>
    </>
  );
};
