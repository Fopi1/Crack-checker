import { makeAutoObservable } from "mobx";

import { categories } from "@/prisma/constants";

import type { SortBy, SortOrder, TakeGames } from "@/types/store";

type SortOptions = {
  sortBy: SortBy;
  sortOrder: SortOrder;
  takeGames: TakeGames;
  isAAA: boolean;
};

class SortStore {
  categoriesSortOptions: Record<string, SortOptions> = {};

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    categories.forEach(
      (category) =>
        (this.categoriesSortOptions[category.title] = {
          sortBy: "views",
          sortOrder: "descending",
          takeGames: "25",
          isAAA: false,
        }),
    );
  }

  setSortBy(category: string, sortBy: SortBy) {
    this.categoriesSortOptions[category].sortBy = sortBy;
  }

  setSortOrder(category: string, sortOrder: SortOrder) {
    this.categoriesSortOptions[category].sortOrder = sortOrder;
  }

  setTakeGames(category: string, value: TakeGames) {
    this.categoriesSortOptions[category].takeGames = value;
  }
  toggleIsAAA(category: string) {
    this.categoriesSortOptions[category].isAAA =
      !this.categoriesSortOptions[category].isAAA;
  }
  disableAllIsAAA(category: string) {
    this.categoriesSortOptions[category].isAAA = false;
  }
}

export const sortStore = new SortStore();
