import { SiteApiRoutes } from "@/constants";
import { axiosSiteInstance } from "@/lib";

type FetchMethod = "GET" | "POST";
interface Props {
  path: string;
  method: FetchMethod;
  data?: Record<string, unknown>;
}

export const trigger = async ({ path, method, data }: Props) => {
  try {
    await axiosSiteInstance.post(SiteApiRoutes.TRIGGER, {
      path,
      method,
      data,
    });
  } catch (error) {
    console.error("Trigger failed", error);
    throw error;
  }
};
