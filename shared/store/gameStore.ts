import { makeAutoObservable } from "mobx";

class GameStore {
  isLiked = false;

  constructor() {
    makeAutoObservable(this);
  }

  setIsLiked() {
    this.isLiked = true;
  }

  removeIsLiked() {
    this.isLiked = false;
  }
}

export const gameStore = new GameStore();
