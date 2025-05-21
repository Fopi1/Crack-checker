import {
  AdminApiRoutes,
  TriggerSchemaByPath,
} from "@/constants";
import { axiosSiteInstance } from "@/lib";
import { z } from "zod";

export interface TriggerProps<P extends keyof typeof AdminApiRoutes> {
  path: P;
  data?: z.infer<(typeof TriggerSchemaByPath)[P]>;
}

export const trigger = async <P extends keyof typeof AdminApiRoutes>({
  path,
  data,
}: TriggerProps<P>) => {
  try {
    await axiosSiteInstance.post(AdminApiRoutes.TRIGGER, {
      path,
      data,
    });
  } catch (error) {
    console.error("Trigger failed", error);
    throw error;
  }
};
