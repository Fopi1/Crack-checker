import { SiteApiRoutes } from "@/constants";
import { axiosSiteInstance } from "@/lib";

export const syncTrigger = async () => {
  try {
    await axiosSiteInstance.post(SiteApiRoutes.SYNC_TRIGGER);
  } catch (error) {
    console.error("Error while triggering sync", error);
    throw error;
  }
};
