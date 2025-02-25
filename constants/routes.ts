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

export const SiteApiRoutes = {
  GAMES: "/games",
  GAME: (slug: string) => `/games/${slug}`,
  REGISTER: "/auth/register",
  LOGIN: "/auth/login",
  LOGOUT: "/auth/logout",
  USER: (id: number) => `/users/${id}`,
  PASSWORD: (id: number) => `/users/${id}/password`,
} as const;

export enum ExternalApiRoutes {
  SEARCH = "/search_title/",
  RELEASED_GAMES = "/releasedgame/",
}
