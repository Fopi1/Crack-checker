"use server";

import { checkIsAdmin } from "@/lib/auth";

import { PanelClient } from "./panelClient";

export const PanelServer = async () => {
  const isAdmin = await checkIsAdmin();
  if (!isAdmin) return null;
  return <PanelClient />;
};
