import { User } from "next-auth";

export type SortBy = "views" | "likes" | "releaseDate" | "crackDate";
export type SortOrder = "ascending" | "descending";
export type TakeGames = "25" | "5" | "10";

export type UserData = {
  id: string;
} & User;
