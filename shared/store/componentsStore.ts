import { makeAutoObservable } from "mobx";

class ComponentsStore {
  isOpened = false;

  constructor() {
    makeAutoObservable(this);
  }

  setIsOpened(state: boolean) {
    this.isOpened = state;
  }

  toggleIsOpened() {
    this.isOpened = !this.isOpened;
  }
}

export const componentStore = new ComponentsStore();
