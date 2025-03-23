import { makeAutoObservable } from "mobx";

class LikedGamesStore {
  likedGames: string[] = [];
  isPending: boolean = false;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setIsPending(value: boolean) {
    this.isPending = value;
  }

  setLikedGames(likedGames: string[]) {
    this.likedGames = [...new Set(likedGames)];
  }

  removeGame(id: string) {
    this.likedGames = this.likedGames.filter(
      (likedGameId) => likedGameId !== id
    );
  }

  addGame(id: string) {
    if (!this.likedGames.includes(id)) {
      this.likedGames = [...this.likedGames, id];
    }
  }
}

export const likedGamesStore = new LikedGamesStore();
