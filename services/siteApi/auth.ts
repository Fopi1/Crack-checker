import { LoginFormSchema } from '@/app/login/constants';
import { RegisterFormSchema } from '@/app/register/constants';
import { SiteApiRoutes } from '@/constants';
import { axiosSiteInstance } from '@/lib';

export const registerUser = async (data: RegisterFormSchema) => {
  try {
    await axiosSiteInstance.post(SiteApiRoutes.REGISTER, data);
  } catch (error) {
    console.error("Cannot register: ", error);
    throw error;
  }
};

export const loginUser = async (data: LoginFormSchema) => {
  try {
    await axiosSiteInstance.post(SiteApiRoutes.LOGIN, data);
  } catch (error) {
    console.error("Cannot login: ", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await axiosSiteInstance.post(SiteApiRoutes.LOGOUT);
  } catch (error) {
    console.error("Logout failed: ", error);
    throw error;
  }
};
