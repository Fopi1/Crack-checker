import { SiteApiRoutes } from '@/constants';
import { axiosSiteInstance } from '@/lib';

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

export const deleteUser = async (userId: number) => {
  try {
    await axiosSiteInstance.delete(SiteApiRoutes.USER(userId));
  } catch (error) {
    console.error(`Cannot delete user with ${userId} id: ${error}`);
    throw error;
  }
};
