"use client";

import { Users } from "lucide-react";
import Image from "next/image";
import { FC, useState } from "react";

import { Steam } from "@/shared/components/icons";
import { Meta } from "@/shared/components/icons/meta";
import { Blurred, Container, TransitionLink } from "@/shared/components/shared";
import {
  CrackBell,
  CrackCracker,
  CrackDate,
  CrackLike,
  CrackProtections,
  CrackReleaseDate,
  CrackScore,
  CrackStatus,
  CrackViews,
} from "@/shared/components/ui/custom";
import { useCrackStatus } from "@/shared/hooks";
import { GameWithLikes } from "@/types/api";

interface Props extends GameWithLikes {
  isLiked?: boolean;
}

export const Game: FC<Props> = (gameProps) => {
  const {
    id,
    title,
    crackDate,
    protections,
    releaseDate,
    shortImage,
    hackedGroups,
    likes,
    views,
    metaScore,
    userScore,
    steamId,
    isLiked = false,
  } = gameProps;

  const [likesNumber, setLikesNumber] = useState(likes.length);
  const [stateIsLiked, setStateIsLiked] = useState(isLiked);

  const handleToggleLike = (likesNumber: number, isLiked: boolean) => {
    setLikesNumber(likesNumber);
    setStateIsLiked(isLiked);
  };

  const { crackedBy, crackStatus } = useCrackStatus({
    releaseDate,
    crackDate,
    hackedGroups,
  });

  const crackBackgroundColor = crackDate ? "bg-crack-green" : "bg-crack-red";
  const crackTextColor = crackDate
    ? "text-crack-light-green"
    : "text-crack-red";

  return (
    <article className="w-full h-full bg-secondary-foreground pt-12">
      <Container>
        <div className="grid grid-cols-[50%_50%] grid-rows-1 gap-4">
          <div className="w-full flex justify-center">
            <div className="w-full flex items-center overflow-hidden rounded-[20px]">
              <Image
                src={shortImage}
                alt={`Image of ${title}`}
                width={1000}
                height={0}
                priority
                className="rounded-[20px]"
              />
            </div>
          </div>
          <div className="w-full h-full flex flex-col justify-between">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h2 className="text-4xl font-medium text-[--text-secondary]">
                    {title}
                  </h2>
                  <Blurred>
                    <CrackStatus
                      crackBackgroundColor={crackBackgroundColor}
                      crackStatus={crackStatus}
                    />
                  </Blurred>
                </div>
                <CrackViews className="w-fit" views={views} />
              </div>
              <div className="w-full flex flex-col gap-5 text-xl">
                <div className="flex justify-between gap-2">
                  <div className="flex flex-col gap-2">
                    <CrackReleaseDate releaseDate={releaseDate} />
                    <CrackDate crackDate={crackDate} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <CrackProtections protections={protections} />
                    <CrackCracker
                      crackedBy={crackedBy}
                      crackTextColor={crackTextColor}
                    />
                  </div>
                </div>
                <div className="flex justify-between gap-2">
                  <div className="flex flex-col gap-2">
                    <CrackScore
                      image={<Meta className="size-9" />}
                      score={metaScore}
                    />
                    <CrackScore
                      image={<Users className="size-9" strokeWidth={3} />}
                      score={userScore}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-between gap-3 font-bold">
              <div className="flex items-center gap-4">
                <CrackLike
                  className="p-5"
                  gameId={id}
                  likesNumber={likesNumber}
                  isLiked={stateIsLiked}
                  handleClick={handleToggleLike}
                />
                <CrackBell className="p-6" />
              </div>
              <TransitionLink
                icon={Steam}
                href={`https://store.steampowered.com/app/${steamId}`}
                backgroundColor="#0c4077"
                hoverColor="#fff"
                className="px-40"
              >
                <span>Get {title}</span>
              </TransitionLink>
            </div>
          </div>
        </div>
      </Container>
    </article>
  );
};
