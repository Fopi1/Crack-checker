"use client";

import { useState } from 'react';

import { SiteApi } from '@/services/siteApi/apiClient';

export const Panel = () => {
  const [isShowed, setIsShowed] = useState(false);
  const text = isShowed ? "Close" : "Show";
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
  return (
    <div className="absolute top-0 left-0 h-screen w-36 z-50">
      <div className="relative w-full h-full">
        <button
          className="absolute left-3 top-3 bg-purple-600"
          onClick={handleClick}
        >
          {text}
        </button>
        <div
          className={`w-full h-full bg-slate-700 py-10 ${
            isShowed ? "block" : "hidden"
          }`}
        >
          <button onClick={handleSync}>Sync</button>
        </div>
      </div>
    </div>
  );
};
