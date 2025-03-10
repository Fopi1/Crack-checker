import z from "zod";

export type CategoryTitles =
  | "Popular games"
  | "Last cracked games"
  | "Hot games"
  | "Most liked"
  | "Unreleased games";
interface Categories {
  id: number;
  title: CategoryTitles;
  icon: string;
}

export const categories: Categories[] = [
  {
    id: 1,
    title: "Popular games",
    icon: "Users",
  },
  {
    id: 2,
    title: "Last cracked games",
    icon: "AlarmClockCheck",
  },
  {
    id: 3,
    title: "Hot games",
    icon: "Flame",
  },
  {
    id: 4,
    title: "Most liked",
    icon: "ThumbsUp",
  },
  {
    id: 5,
    title: "Unreleased games",
    icon: "Clock",
  },
];

export const GameSchema = z.object({
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

export type AllGameData = z.infer<typeof GameSchema>;

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
