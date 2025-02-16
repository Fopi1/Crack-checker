import FPIBank from "@/public/FPI.webp";
import { GameWithLikes } from "@/types/api";

export const coolPlaceholder: GameWithLikes = {
  id: "$FPI",
  slug: "fpi-bank",
  title: "FPI BANK",
  crackDate: null,
  protections: "NOWKIE",
  releaseDate: "2024-10-01",
  //@ts-expect-error Cannot add StaticImageData type to Game interface
  shortImage: FPIBank,
  hackedGroups: "",
  likes: Array(100).fill({}),
  views: 999999,
  metaScore: 50,
  userScore: 100,
  steamId: 0,
};
