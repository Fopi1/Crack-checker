import { z } from "zod";

export const SteamQuerySchema = z.object({
  is_modified_since: z.number().optional(),
  have_description_language: z.string().optional(),
  include_games: z.boolean().optional(),
  include_dlc: z.boolean().optional(),
  include_software: z.boolean().optional(),
  include_videos: z.boolean().optional(),
  include_hardware: z.boolean().optional(),
  last_appid: z.number().optional(),
  max_results: z.number().optional(),
});

export type SteamQueryProps = z.infer<typeof SteamQuerySchema>;

export const SteamQueryData = SteamQuerySchema.shape;
