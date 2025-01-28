import z from "zod";

export const categories = [
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
