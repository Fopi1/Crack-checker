export interface GameFromDB {
  title: string;
  isAAA: boolean;
  protections: string;
  hackedGroups: string;
  releaseDate: string;
  crackDate: string | null;
  shortImage: string;
  likes: number;
  views: number;
}
