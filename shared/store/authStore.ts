import { SiteApi } from "@/services/siteApi/apiClient";
import { makeAutoObservable } from "mobx";
// import { parseCookies } from "nookies";

class AuthStore {
  userId: number | null = null;
  isRememberMe = false;

  constructor() {
    makeAutoObservable(this);
    // this.checkAuthStatus();
  }

  // async checkAuthStatus() {
  //   try {
  //     const cookies = parseCookies();
  //     const token = cookies["accessToken"];
  //     if (token) {
  //       const user = await SiteApi.users.getUserId();
  //       this.userId = user;
  //     } else {
  //       this.userId = null;
  //     }
  //   } catch (error) {
  //     console.error("Error checking auth status:", error);
  //     this.userId = null;
  //   }
  // }

  // logout() {
  //   this.userId = null;
  //   document.cookie = "accessToken=; Max-Age=0; path=/;";
  // }

  toggleIsRememberMe() {
    this.isRememberMe = !this.isRememberMe;
  }
}

export const authStore = new AuthStore();
