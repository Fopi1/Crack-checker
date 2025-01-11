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
  short_image: string;
}
export interface AllGameData extends ReleasedGamesData {
  protections: string;
  hacked_groups: string;
  crack_date: string | null;
  steam_prod_id: number | null;
  mata_score: number | null;
  user_score: number | null;
}

export type AddValue = "like" | "view";

export type LikeActions = "liked" | "disliked";

export type PutProps = {
  gameId: string;
  addValue: AddValue;
};

export interface GameWithLikes extends Game {
  likes: User[];
}
