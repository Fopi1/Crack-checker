import { makeAutoObservable } from "mobx";
import { categories } from "@/prisma/constants";

class SortStore {
  sortBy = "views";
  sortOrder = "descending";
  takeGames: Record<string, string> = {};
  constructor() {
    makeAutoObservable(this);
    categories.forEach((category) => (this.takeGames[category.title] = "2"));
  }

  setSortBy(option: string) {
    this.sortBy = option;
  }

  setSortOrder(option: string) {
    this.sortOrder = option;
  }

  setTakeGames(category: string, value: string) {
    this.takeGames[category] = value;
  }
}

export const sortStore = new SortStore();
