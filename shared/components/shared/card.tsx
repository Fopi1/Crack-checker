import { FC } from "react";
import { cn } from "@/lib/utils";
import { Bell, Calendar, Eye, ThumbsUp } from "lucide-react";
import Link from "next/link";
import { useCrackStatus } from "@/shared/hooks";
import { Game } from "@prisma/client";

interface Props extends Omit<Game, "id" | "slug" | "apiId"> {
  className?: string;
}

export const Card: FC<Props> = (props) => {
  const {
    className,
    title,
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

  return (
    <div
      className={cn(
        "transition-transform duration-300 ease-in-out hover:scale-105 hover:drop-shadow-card h-[336px]",
        className
      )}
    >
      <Link
        href="/"
        className={cn(
          "cursor-pointer flex flex-col flex-shrink w-[100%] rounded-2xl",
          className
        )}
      >
        <div
          style={{ backgroundImage: `url(${shortImage})` }}
          className="overflow-hidden relative h-52 rounded-2xl bg-cover bg-center flex flex-col justify-between font-bold"
        >
          <div
            className={`self-end float-right m-1 px-3 py-[2px] rounded-2xl text-sm font-semibold ${crackBackgroundColor} drop-shadow-status`}
          >
            <p>{crackStatus}</p>
          </div>
          <div className="bg-gray-950/70 backdrop-blur-sm w-full">
            <div className="px-4 py-3 flex justify-between">
              <h2 className="text-xl w-56 overflow-hidden text-nowrap text-ellipsis">
                {title}
              </h2>
              <div className="flex gap-1">
                <div className="bg-gray-950 rounded-xl px-4 py-1 flex items-center transition-transform duration-300 ease-in-out hover:scale-110 will-change-transform hover:rotate-[15deg]">
                  <Bell size={20} strokeWidth={3} className="text-orange-400" />
                </div>
                <div className="bg-blue-500 rounded-3xl px-10 py-1 flex items-center gap-1 transition-transform duration-300 ease-in-out hover:scale-110 will-change-transform hover:rotate-[-15deg]">
                  <ThumbsUp size={16} strokeWidth={3} />
                  <p>{likes}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
      <div className="flex flex-col items-start">
        <div className="flex flex-col pt-2">
          <div className="flex gap-1">
            <p>Release Date:</p>
            <span className="flex gap-1 items-center text-orange-300 font-bold">
              <Calendar size={16} strokeWidth={2.7} />
              {releaseDate}
            </span>
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
              <span className="flex gap-1 items-center text-orange-300 font-bold">
                <Calendar size={16} strokeWidth={2.7} />
                {crackDate}
              </span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-1 text-orange-300 font-bold w-full justify-end">
          <Eye size={16} strokeWidth={3} />
          {views}
        </div>
      </div>
    </div>
  );
};
