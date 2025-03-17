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
  GAME: (id: string) => `/games/${id}`,
  REGISTER: "/auth/register",
  LOGIN: "/auth/login",
  LOGOUT: "/auth/logout",
  USER: (id: number) => `/users/${id}`,
  PASSWORD: (id: number) => `/users/${id}/password`,
  SEARCH_GAME: (query: string) => `/games?query=${query}`,
  LIKED_GAMES: "/users/liked-games",
} as const;

export const ExternalApiRoutes = {
  SEARCH: "/search_title/",
  RELEASED_GAMES: "/releasedgame/",
} as const;
