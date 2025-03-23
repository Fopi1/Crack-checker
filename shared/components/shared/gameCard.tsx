"use client";

import Image from "next/image";
import { memo } from "react";

import { AppRoutes } from "@/constants/routes";
import { performActionOnGame } from "@/services/siteApi/games";
import { useCrackStatus } from "@/shared/hooks";
import { processingActionsStore } from "@/shared/store/processingActionsStore";

import {
  CrackBell,
  CrackCracker,
  CrackDate,
  CrackLike,
  CrackProtections,
  CrackReleaseDate,
  CrackStatus,
  CrackViews,
} from "../ui";
import { ProtectedLink } from "./protectedLink";

import type { FullGame } from "@/types/api";
interface Props {
  game: FullGame;
}

const GameCardComponent = ({ game }: Props) => {
  const {
    title,
    id,
    slug,
    crackDate,
    protections,
    releaseDate,
    shortImage,
    hackedGroups,
    views,
  } = game;
  const { crackedBy, crackStatus } = useCrackStatus({
    releaseDate,
    crackDate,
    hackedGroups,
  });

  const crackBackgroundColor = crackDate ? "bg-crack-green" : "bg-crack-red";
  const crackTextColor = crackDate
    ? "text-crack-light-green"
    : "text-crack-red";
  const addView = async () => {
    if (processingActionsStore.hasAction(id, "view")) return;
    processingActionsStore.addAction(id, "view");
    try {
      await performActionOnGame(id, "view");
    } catch (error) {
      console.error("Action failed:", error);
    } finally {
      processingActionsStore.removeAction(id, "view");
    }
  };

  return (
    <article className="transition-transform duration-300 ease-in-out scale-95 hover:scale-100 hover:drop-shadow-card text-[#fff]">
      <ProtectedLink
        href={AppRoutes.GAME(slug)}
        onClick={addView}
        className="cursor-pointer flex flex-col flex-shrink w-[100%] rounded-2xl"
      >
        <figure className="overflow-hidden relative h-56 rounded-2xl bg-cover bg-center flex flex-col justify-between font-bold">
          <Image
            src={shortImage}
            fill
            sizes="300px"
            alt="Game image"
            loading="lazy"
            quality={25}
          />
          <figcaption className="self-end m-1">
            <CrackStatus
              crackBackgroundColor={crackBackgroundColor}
              crackStatus={crackStatus}
            />
          </figcaption>
          <div className="bg-gray-950/70 backdrop-blur-sm w-full">
            <div className="px-4 py-3 flex justify-between">
              <h2 className="text-xl w-64 overflow-hidden text-nowrap text-ellipsis">
                {title}
              </h2>
              <div className="flex gap-1">
                <CrackBell />
                <CrackLike game={game} />
              </div>
            </div>
          </div>
        </figure>
      </ProtectedLink>
      <section className="flex flex-col items-start">
        <div className="flex flex-col pt-2">
          <CrackReleaseDate releaseDate={releaseDate} />
          <CrackProtections protections={protections} />
          <CrackCracker crackTextColor={crackTextColor} crackedBy={crackedBy} />
          <CrackDate crackDate={crackDate} />
        </div>
        <CrackViews views={views} />
      </section>
    </article>
  );
};

const GameCard = memo(GameCardComponent);
GameCard.displayName = "GameCard";
export { GameCard };
