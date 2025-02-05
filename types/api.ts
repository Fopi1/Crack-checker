import { z } from "zod";

import { GameSchema } from "@/prisma/constants";
import { Game, User } from "@prisma/client";

export type SortBy = "views" | "likes" | "releaseDate" | "crackDate";
export type SortOrder = "ascending" | "descending";
export type TakeGames = "25" | "5" | "10";
export interface ReleasedGamesData {
  id: string;
  slug: string;
  title: string;
  is_AAA: boolean;
  release_date: string;
  crack_date: string | null;
  short_image: string;
  steam_prod_id: number | null;
}
export type AllGameData = z.infer<typeof GameSchema>;

export type AddValue = "like" | "view";

export type LikeActions = "liked" | "disliked";

export type PutProps = {
  gameId: string;
  addValue: AddValue;
};

export interface GameWithLikes extends Game {
  likes: User[];
}
