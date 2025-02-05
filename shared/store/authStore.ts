import { makeAutoObservable } from "mobx";

import { SiteApi } from "@/services/siteApi/apiClient";

class AuthStore {
  userData: { id: number; name: string } | null = null;
  isRememberMe = false;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  toggleIsRememberMe = () => {
    this.isRememberMe = !this.isRememberMe;
  };

  checkAuth = () => {
    if (this.isLoading) return;
    this.isLoading = true;
    try {
      const payload = SiteApi.users.getCookiePayload();
      if (!payload) {
        SiteApi.users.removeCookiePayload();
        this.userData = null;
        return null;
      }
      this.userData = { id: payload.id, name: payload.name };
    } catch (error) {
      console.error("Auth check error:", error);
      this.userData = null;
      SiteApi.users.removeCookiePayload();
    } finally {
      this.isLoading = false;
    }
  };
}

export const authStore = new AuthStore();
