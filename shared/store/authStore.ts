import { flow, makeAutoObservable } from "mobx";

import { SiteApi } from "@/services/siteApi/apiClient";
import { UserData } from "@/types/store";

class AuthStore {
  userData: UserData = null;
  isRememberMe = false;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  toggleIsRememberMe = () => {
    this.isRememberMe = !this.isRememberMe;
  };

  setAuthState = (userData: typeof this.userData) => {
    this.userData = userData;
  };

  checkAuth = flow(function* (this: AuthStore) {
    if (this.isLoading) return;
    this.isLoading = true;
    try {
      const payload = yield SiteApi.users.getJWTPayload();
      if (!payload) {
        SiteApi.users.removeCookiePayload();
        this.userData = null;
        return null;
      }
      this.userData = { id: payload.id, name: payload.name };
      return payload;
    } catch (error) {
      console.error("Auth check error:", error);
      this.userData = null;
      SiteApi.users.removeCookiePayload();
    } finally {
      this.isLoading = false;
    }
  });
}

export const authStore = new AuthStore();
