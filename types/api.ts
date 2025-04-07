import { Category, Game, Like } from '@prisma/client';

export type StatusCodeType =
  | 200
  | 201
  | 204
  | 400
  | 401
  | 403
  | 404
  | 409
  | 422
  | 429
  | 500;

export type AddValue = "like" | "view" | "subscription";

export type LikeActions = "liked" | "disliked";

type CategoryTitle = Pick<Category, "title">;
type GameId = Pick<Like, "gameId">;

export type GameWithCategories = Game & {
  categories: CategoryTitle[];
};
export type GameWithLikes = Game & {
  likes: GameId[];
};
export type GameWithSubscriptions = Game & {
  subscriptions: GameId[];
};
export type FullGame = Game & {
  categories: CategoryTitle[];
  likes: GameId[];
  subscriptions: GameId[];
};
