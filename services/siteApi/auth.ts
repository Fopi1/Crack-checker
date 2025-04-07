import { RegisterFormSchema } from "@/app/(me)/register/constants";
import { SiteApiRoutes } from "@/constants";
import { axiosSiteInstance } from "@/lib";

export const registerUser = async (data: RegisterFormSchema) => {
  try {
    await axiosSiteInstance.post(SiteApiRoutes.REGISTER, data);
  } catch (error) {
    console.error("Cannot register: ", error);
    throw error;
  }
};
