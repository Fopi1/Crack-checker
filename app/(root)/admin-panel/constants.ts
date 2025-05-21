import { AdminApiRoutes } from "@/constants";
import { normalizeZodObject } from "@/lib/utils/normalizeZodObject";
import { SteamQuerySchema } from "@/schemas/steam";

export interface IAdminCommand {
  name: string;
  description: string;
  path: string;
  data?: Record<string, string>;
}

export const adminCommands: IAdminCommand[] = [
  {
    name: "Sync",
    description: "Add new and sync existing games using external API",
    path: AdminApiRoutes.SYNC,
  },
  {
    name: "Notify",
    description: "Forcibly notify all subscribed users",
    path: AdminApiRoutes.NOTIFY_CRACKED_GAMES,
  },
  {
    name: "Steam",
    description: "LONG EXECUTION!!! Add 'n' games to your database",
    path: AdminApiRoutes.STEAM_GAMES,
    data: normalizeZodObject(SteamQuerySchema.shape),
  },
];
