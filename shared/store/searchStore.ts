import { makeAutoObservable } from 'mobx';

class SearchStore {
  searchedGames = [];

  constructor() {
    makeAutoObservable(this);
  }
}
