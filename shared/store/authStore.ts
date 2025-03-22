import { makeAutoObservable } from 'mobx';

import type { UserData } from "@/types/store";
class AuthStore {
  userData: UserData | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setUserData = (userData: typeof this.userData) => {
    this.userData = userData;
  };
}

export const authStore = new AuthStore();
