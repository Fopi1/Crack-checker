"use client";

import { Container } from "@/shared/components/shared";
import { useCrackStatus } from "@/shared/hooks";
import { GameWithLikes } from "@/types/api";
import Image from "next/image";
import metaImage from "@/public/meta.svg";
import { Users } from "lucide-react";
import { Blurred } from "@/shared/components/shared/blurred";

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
        <div className="grid grid-cols-[1fr_auto_1fr] grid-rows-1 gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-[--text-secondary] leading-7 text-2xl font-medium ">
              Scores:
            </h2>
            <div className="flex gap-3">
              <div className="flex items-center gap-2">
                <Image
                  src={metaImage}
                  width={metaScoreSize}
                  height={metaScoreSize}
                  alt="Metascore image"
                />
                {metaScore ? (
                  <p>{metaScore}</p>
                ) : (
                  <Blurred>
                    <p>{"Venom"}</p>
                  </Blurred>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Users />
                <p>{userScore}</p>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <div className="w-[900px] h-[400px] flex items-center overflow-hidden rounded-md">
              <Image
                src={shortImage}
                alt={`Image of ${title}`}
                width={1100}
                height={600}
                className="contain-size"
              />
            </div>
          </div>
          <div className="w-full flex flex-col gap-3 items-end">
            <h2 className="leading-[38px] text-[32px] font-medium text-[--text-secondary]">
              {title}
            </h2>
            <p
              className={`w-fit px-3 py-[2px] rounded-2xl text-sm font-semibold ${crackBackgroundColor} drop-shadow-status`}
            >
              {crackStatus}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
