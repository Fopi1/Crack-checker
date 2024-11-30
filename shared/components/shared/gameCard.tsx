"use client";

import { FC } from "react";
import { cn } from "@/lib/utils";
import { Bell, Calendar, Eye, ThumbsUp } from "lucide-react";
import Link from "next/link";
import { useCrackStatus } from "@/shared/hooks";
import { Game } from "@prisma/client";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { axiosSiteInstance } from "@/services/instance";
import { ApiRoutes } from "@/services/siteApi/constants";
import { AddValue } from "@/app/api/games/route";

interface Props extends Omit<Game, "id"> {
  className?: string;
}

export const GameCard: FC<Props> = (props) => {
  const {
    className,
    title,
    apiId,
    slug,
    crackDate,
    protections,
    releaseDate,
    shortImage,
    hackedGroups,
    likes,
    views,
  } = props;

  const { crackedBy, crackStatus } = useCrackStatus({
    releaseDate,
    crackDate,
    hackedGroups,
  });

  const crackBackgroundColor = crackDate ? "bg-green-700" : "bg-red-600";
  const crackTextColor = crackDate ? "text-green-600" : "text-red-600";

  const handleClick = async (addValue: AddValue) => {
    try {
      await axiosSiteInstance.put(ApiRoutes.GAMES, {
        apiId,
        addValue,
      });
      console.log("updated");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <article
      className={cn(
        "transition-transform duration-300 ease-in-out scale-95 hover:scale-100 hover:drop-shadow-card  text-[#fff]",
        className
      )}
    >
      <Link
        href={`/game/${slug}`}
        onClick={() => {
          handleClick("views");
        }}
        className={cn(
          "cursor-pointer flex flex-col flex-shrink w-[100%] rounded-2xl",
          className
        )}
      >
        <figure
          style={{ backgroundImage: `url(${shortImage})` }}
          className="overflow-hidden relative h-52 rounded-2xl bg-cover bg-center flex flex-col justify-between font-bold"
        >
          <figcaption
            className={`self-end float-right m-1 px-3 py-[2px] rounded-2xl text-sm font-semibold ${crackBackgroundColor} drop-shadow-status`}
          >
            <p>{crackStatus}</p>
          </figcaption>
          <div className="bg-gray-950/70 backdrop-blur-sm w-full">
            <div className="px-4 py-3 flex justify-between">
              <h2 className="text-xl w-64 overflow-hidden text-nowrap text-ellipsis">
                {title}
              </h2>
              <div className="flex gap-1">
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <button className="h-full bg-gray-950 rounded-xl px-3 py-1 flex items-center transition-transform duration-300 ease-in-out hover:scale-110 will-change-transform hover:rotate-[15deg]">
                      <Bell
                        size={20}
                        strokeWidth={3}
                        className="text-orange-400"
                      />
                    </button>
                  </HoverCardTrigger>
                  <HoverCardContent
                    className="bg-black text-center rounded-[6px] border-none w-auto"
                    side="top"
                  >
                    <p className="font-normal px-1">Turn on notifications</p>
                  </HoverCardContent>
                </HoverCard>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick("likes");
                  }}
                  className="bg-blue-600 rounded-2xl px-10 py-[6px] flex items-center gap-1 transition-transform duration-300 ease-in-out hover:scale-110 will-change-transform hover:rotate-[-15deg]"
                >
                  <ThumbsUp
                    className="pointer-events-none mb-[2px]"
                    size={16}
                    strokeWidth={3}
                  />
                  <p>{likes}</p>
                </button>
              </div>
            </div>
          </div>
        </figure>
      </Link>
      <section className="flex flex-col items-start">
        <div className="flex flex-col pt-2">
          <div className="flex gap-1">
            <p>Release Date:</p>
            <time className="flex gap-1 items-center text-orange-300 font-bold">
              <Calendar size={16} strokeWidth={2.7} />
              {releaseDate}
            </time>
          </div>
          <div className="flex gap-1">
            <p>Protection</p>
            <span className=" text-blue-500 font-bold uppercase">
              {protections}
            </span>
          </div>
          <div className="flex gap-1">
            <p>Cracked by:</p>
            <span className={`${crackTextColor} font-bold uppercase`}>
              {crackedBy}
            </span>
          </div>
          {crackDate && (
            <div className="flex gap-1">
              <p>Crack Date:</p>
              <time className="flex gap-1 items-center text-orange-300 font-bold">
                <Calendar size={16} strokeWidth={2.7} />
                {crackDate}
              </time>
            </div>
          )}
        </div>
        <div className="flex items-center gap-1 text-orange-300 font-bold w-full justify-end">
          <Eye size={16} strokeWidth={3} />
          {views}
        </div>
      </section>
    </article>
  );
};
