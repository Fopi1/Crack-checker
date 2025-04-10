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
  SEARCH_GAME: (query: string) => `/games?query=${query}`,
  REGISTER: "/auth/register",
  LOGIN: "/auth/login",
  LOGOUT: "/auth/logout",
  USER: "/users",
  PASSWORD: "/users/password",
  LIKED_GAMES: "/users/liked-games",
  SUBSCRIPTIONS: "/users/subscriptions",
  SYNC_TRIGGER: "/admin/sync-trigger",
  SYNC: "/admin/sync",
  NOTIFY_CRACKED_GAMES: "/admin/notify-cracked-games",
} as const;

export const ExternalApiRoutes = {
  SEARCH: "/search_title/",
  RELEASED_GAMES: "/releasedgame/",
} as const;
