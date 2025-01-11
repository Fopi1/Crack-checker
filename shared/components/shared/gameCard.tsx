"use client";

import { FC, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useCrackStatus } from "@/shared/hooks";
import { GameWithLikes } from "@/types/api";
import { GameCrackStatus } from "./uiGameCard/gameCrackStatus";
import {
  GameBell,
  GameCrackDate,
  GameCracker,
  GameLike,
  GameProtections,
  GameReleaseDate,
  GameViews,
} from "./uiGameCard";
import { performActionOnGame } from "@/services/siteApi/games";
import Image from "next/image";

interface Props extends GameWithLikes {
  className?: string;
  isLiked: boolean;
}

export const GameCard: FC<Props> = (props) => {
  const {
    className,
    title,
    id,
    slug,
    crackDate,
    protections,
    releaseDate,
    shortImage,
    hackedGroups,
    likes,
    views,
    isLiked = false,
  } = props;
  const [stateIsLiked, setStateIsLiked] = useState(isLiked);
  const [likesNumber, setLikesNumber] = useState(likes.length);
  const processingActions = useRef<string[]>([]);
  const { crackedBy, crackStatus } = useCrackStatus({
    releaseDate,
    crackDate,
    hackedGroups,
  });

  const crackBackgroundColor = crackDate ? "bg-green-700" : "bg-red-600";
  const crackTextColor = crackDate ? "text-green-600" : "text-red-600";

  const handleToggleLike = (likesNumber: number, isLiked: boolean) => {
    setLikesNumber(likesNumber);
    setStateIsLiked(isLiked);
  };
  const addView = async () => {
    if (processingActions.current.includes("view")) return;
    processingActions.current = [...processingActions.current, "view"];
    try {
      await performActionOnGame(id, "view");
    } catch (error) {
      console.error(error);
    } finally {
      processingActions.current = processingActions.current.filter(
        (action) => action !== "view"
      );
    }
  };
  return (
    <article
      className={cn(
        "transition-transform duration-300 ease-in-out scale-95 hover:scale-100 hover:drop-shadow-card text-[#fff]",
        className
      )}
    >
      <Link
        href={`/game/${slug}`}
        onClick={addView}
        className={cn(
          "cursor-pointer flex flex-col flex-shrink w-[100%] rounded-2xl",
          className
        )}
      >
        <figure className="overflow-hidden relative h-52 rounded-2xl bg-cover bg-center flex flex-col justify-between font-bold">
          <Image src={shortImage} fill alt="Game image" quality={100} />
          <figcaption className="self-end m-1">
            <GameCrackStatus
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
                <GameBell />
                <GameLike
                  gameId={id}
                  isLiked={stateIsLiked}
                  likesNumber={likesNumber}
                  handleClick={handleToggleLike}
                />
              </div>
            </div>
          </div>
        </figure>
      </Link>
      <section className="flex flex-col items-start">
        <div className="flex flex-col pt-2">
          <GameReleaseDate releaseDate={releaseDate} />
          <GameProtections protections={protections} />
          <GameCracker crackTextColor={crackTextColor} crackedBy={crackedBy} />
          {crackDate && <GameCrackDate crackDate={crackDate} />}
        </div>
        <GameViews views={views} />
      </section>
    </article>
  );
};
