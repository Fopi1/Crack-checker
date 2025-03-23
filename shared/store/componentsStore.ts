import { makeAutoObservable } from "mobx";

class ComponentsStore {
  isOpened: boolean = false;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setIsOpened(state: boolean) {
    this.isOpened = state;
  }

  toggleIsOpened() {
    this.isOpened = !this.isOpened;
  }
}

export const componentStore = new ComponentsStore();
