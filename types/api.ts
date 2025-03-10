import { Game } from "@prisma/client";

export type AddValue = "like" | "view";

export type LikeActions = "liked" | "disliked";

export interface GameWithCategories extends Game {
  categories: { title: string }[];
}
export interface GameWithLikes extends Game {
  likes: { id: number }[];
}

export interface FullGame extends Game {
  likes: { id: number }[];
  categories: { title: string }[];
}
