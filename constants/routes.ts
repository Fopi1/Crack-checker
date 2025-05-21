export const AppRoutes = {
  MAIN: "/",
  PROFILE: "/profile",
  LOGIN: "/login",
  REGISTER: "/register",
  RELEASE_CALENDAR: "/release-calendar",
  ARTICLES: "/articles",
  FORGOT_PASSWORD: "/forgot-password",
  GAME: (slug: string) => `/game/${slug}`,
  ADMIN_PANEL: `/admin-panel`,
} as const;

export const SiteApiRoutes = {
  GAMES: "/games/main",
  GAME: (id: string) => `/games/${id}`,
  SEARCH_GAME: (query: string) => `/games/search?query=${query}`,
  REGISTER: "/auth/register",
  LOGIN: "/auth/login",
  LOGOUT: "/auth/logout",
  USER: "/users",
  PASSWORD: "/users/password",
  LIKED_GAMES: "/users/liked-games",
  SUBSCRIPTIONS: "/users/subscriptions",
  RELEASE_CALENDAR: "/games/calendar",
} as const;

export const AdminApiRoutes = {
  SYNC: "/admin/sync",
  NOTIFY_CRACKED_GAMES: "/admin/notify-cracked-games",
  STEAM_GAMES: "/admin/steam",
  TRIGGER: "/admin/trigger",
};

export const ExternalApiRoutes = {
  SEARCH: "/search_title/",
  RELEASED_GAMES: "/releasedgame/",
} as const;
