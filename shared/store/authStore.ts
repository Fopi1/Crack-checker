import { makeAutoObservable } from "mobx";

class AuthStore {
  isRememberMe = false;

  constructor() {
    makeAutoObservable(this);
  }

  toggleIsRememberMe() {
    this.isRememberMe = !this.isRememberMe;
  }
}

export const authStore = new AuthStore();
