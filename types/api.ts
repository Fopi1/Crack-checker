export interface ReleasedGamesData {
  id: string;
  slug: string;
  title: string;
  is_AAA: boolean;
  release_date: string;
  short_image: string;
}
export interface AllGameData extends ReleasedGamesData {
  protections: string;
  hacked_groups: string;
  crack_date: string | null;
}
