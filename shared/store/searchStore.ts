import { makeAutoObservable } from 'mobx';

import { FullGame } from '@/types/api';

class SearchStore {
  userInput = "";
  isOpened = false;
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

  setIsOpened(value: boolean) {
    this.isOpened = value;
  }
}

export const searchStore = new SearchStore();
