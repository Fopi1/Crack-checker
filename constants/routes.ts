export const AppRoutes = {
  MAIN: "/",
  PROFILE: "/profile",
  LOGIN: "/login",
  REGISTER: "/register",
  RELEASE_CALENDAR: "/release-calendar",
  ARTICLES: "/articles",
  FORGOT_PASSWORD: "/forgot-password",
  GAME: (slug: string) => `/game/${slug}`,
} as const;

export enum SiteApiRoutes {
  GAMES = "/games",
  GAME = "/games/[slug]",
  REGISTER = "/auth/register",
  LOGIN = "/auth/login",
  LOGOUT = "/auth/logout",
  USER = "/update/user",
  PASSWORD = "/update/password",
}

export enum ExternalApiRoutes {
  SEARCH = "/search_title/",
  RELEASED_GAMES = "/releasedgame/",
}
