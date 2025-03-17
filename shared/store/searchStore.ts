import { makeAutoObservable } from "mobx";

import { FullGame } from "@/types/api";

class SearchStore {
  userInput = "";
  searchedGames: FullGame[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setSearchedGames(games: FullGame[]) {
    this.searchedGames = games;
  }

  setUserInput(newInput: string) {
    this.userInput = newInput;
  }
}

export const searchStore = new SearchStore();
