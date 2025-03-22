import { Category, Game, User } from '@prisma/client';

export type AddValue = "like" | "view";

export type LikeActions = "liked" | "disliked";

type CategoryTitle = Pick<Category, "title">;

type UserId = Pick<User, "id">;

export type GameWithCategories = Game & {
  categories: CategoryTitle[];
};

export type GameWithLikes = Game & {
  likes: UserId[];
};

export type FullGame = Game & {
  categories: CategoryTitle[];
  likes: UserId[];
};
