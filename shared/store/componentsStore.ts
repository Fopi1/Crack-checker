import { makeAutoObservable } from "mobx";

class ComponentsStore {
  isOpened = false;

  constructor() {
    makeAutoObservable(this);
  }

  setIsOpened(state: boolean) {
    this.isOpened = state;
  }
}

export const componentStore = new ComponentsStore();
