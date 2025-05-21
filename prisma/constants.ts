import z from "zod";

import { Category } from "@prisma/client";

export const categories: Category[] = [
  {
    title: "Popular games",
  },
  {
    title: "Last cracked games",
  },
  {
    title: "Hot games",
  },
  {
    title: "Most liked",
  },
  {
    title: "Unreleased games",
  },
];

export const AllGameDataSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  is_AAA: z.boolean(),
  protections: z.string(),
  hacked_groups: z.string(),
  release_date: z.string(),
  crack_date: z.string().nullable(),
  short_image: z.string().url(),
  steam_prod_id: z.number().nullable(),
  user_score: z.number().nullable(),
  mata_score: z.number().nullable(),
});

export type AllGameData = z.infer<typeof AllGameDataSchema>;

export type ReleasedGamesData = {
  id: string;
  slug: string;
  title: string;
  is_AAA: boolean;
  release_date: string;
  crack_date: string | null;
  short_image: string;
  steam_prod_id: number | null;
};
