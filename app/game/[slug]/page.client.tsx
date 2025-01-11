"use client";

import {
  Container,
  GameCrackDate,
  GameCrackStatus,
  GameLike,
  GameReleaseDate,
} from "@/shared/components/shared";
import { useCrackStatus } from "@/shared/hooks";
import { GameWithLikes } from "@/types/api";
import Image from "next/image";
import metaImage from "@/public/meta.svg";
import { Users } from "lucide-react";
import { Blurred } from "@/shared/components/shared";

interface Props {
  game: GameWithLikes;
}

export default function GameClient({ game }: Props) {
  const {
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
    metaScore,
    userScore,
    steamId,
    isLiked = false,
  } = game;

  const { crackedBy, crackStatus } = useCrackStatus({
    releaseDate,
    crackDate,
    hackedGroups,
  });

  const metaScoreSize = 36;

  const crackBackgroundColor = crackDate ? "bg-green-700" : "bg-red-600";
  const crackTextColor = crackDate ? "text-green-600" : "text-red-600";
  return (
    <section className="w-full h-full bg-secondary-foreground pt-12">
      <Container>
        <div className="grid grid-cols-[50%_50%] grid-rows-1 gap-4">
          <div className="w-full flex justify-center">
            <div className="w-[900px] h-[400px] flex items-center overflow-hidden rounded-md">
              <Image
                src={shortImage}
                alt={`Image of ${title}`}
                width={1100}
                height={600}
                priority
                className="contain-size"
              />
            </div>
          </div>
          <div className="w-full h-fit flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <h2 className="text-4xl font-medium text-[--text-secondary]">
                {title}
              </h2>
              <Blurred>
                <GameCrackStatus
                  crackBackgroundColor={crackBackgroundColor}
                  crackStatus={crackStatus}
                />
              </Blurred>
            </div>
            <div className="flex flex-col justify-center gap-2 text-xl">
              <GameReleaseDate releaseDate={releaseDate} />
              {crackDate && <GameCrackDate crackDate={crackDate} />}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
