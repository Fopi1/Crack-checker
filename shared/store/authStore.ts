import { flow, makeAutoObservable } from 'mobx';

import { getJWTPayload } from '@/lib/utils';
import { SiteApi } from '@/services/siteApi/apiClient';

import type { JWTToken } from "@/types/jwt";
import type { UserData } from "@/types/store";
class AuthStore {
  userData: UserData | null = null;
  isRememberMe = false;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  toggleIsRememberMe = () => {
    this.isRememberMe = !this.isRememberMe;
  };

  setUserData = (userData: typeof this.userData) => {
    this.userData = userData;
  };

  checkAuth = flow(function* (this: AuthStore) {
    if (this.isLoading) return;
    this.isLoading = true;
    try {
      const payload: JWTToken = yield getJWTPayload();
      if (!payload) {
        SiteApi.auth.logout();
        this.userData = null;
        return null;
      }
      this.userData = {
        id: payload.id,
        name: payload.name,
        email: payload.email,
      };
      return payload;
    } catch (error) {
      console.error("Auth check error:", error);
      SiteApi.auth.logout();
      this.userData = null;
    } finally {
      this.isLoading = false;
    }
  });
}

export const authStore = new AuthStore();
