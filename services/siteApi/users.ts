import { UserInfoSchema } from "@/app/(user)/profile/constants";
import { SiteApiRoutes } from "@/constants";
import { axiosSiteInstance } from "@/lib";
import { User } from "@prisma/client";

export const getLikedGames = async () => {
  try {
    const { data } = await axiosSiteInstance.get<string[]>(
      SiteApiRoutes.LIKED_GAMES
    );
    return data;
  } catch (error) {
    console.error("Cannot get liked games: ", error);
    return null;
  }
};

export const deleteUser = async () => {
  try {
    await axiosSiteInstance.delete(SiteApiRoutes.USER);
  } catch (error) {
    console.error(`Cannot delete user with id: ${error}`);
    throw error;
  }
};

export const changeUserInfo = async (data: UserInfoSchema) => {
  try {
    const response = await axiosSiteInstance.patch<{
      success: boolean;
      user: Omit<User, "password" | "id">;
    }>(SiteApiRoutes.USER, data);
    return response;
  } catch (error) {
    console.error(`Cannot update info with user: ${error}`);
    throw error;
  }
};

export const changeUserPassword = async (data: {
  password: string;
  confirmPassword: string;
  currentPassword: string;
}) => {
  try {
    await axiosSiteInstance.patch(SiteApiRoutes.PASSWORD, data);
  } catch (error) {
    console.error(`Cannot update password with user: ${error}`);
    throw error;
  }
};
