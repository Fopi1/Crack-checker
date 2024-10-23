import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Heart } from "lucide-react";
import Image from "next/image";

export const Footer = () => {
  return (
    <div className="bg-[--background-secondary] px-10 pt-10 pb-5 flex flex-col gap-5">
      <div className="flex flex-col items-center gap-2">
        <h1 className="font-bold text-xl">
          Special thanks to{" "}
          <a
            href="https://crackwatcher.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[--text-secondary]"
          >
            Crackwatcher
          </a>{" "}
          for providing the design inspiration for this site, and to{" "}
          <a
            href="https://gamestatus.info/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[--text-gamestatus]"
          >
            GameStatus
          </a>{" "}
          for the API and the overall idea for this project.
        </h1>
        <Heart color="red" size={48} strokeWidth={3} />
      </div>
      <p>
        CrackChecker.com respects the developers and others responsible for the
        games listed on our site. <br /> All sub-pages including the home page,
        are for informational purposes only, this means that we do not teach or
        persuade our visitors to download games illegally. <br /> We do not
        provide any download links on our sites, we are fully compliant with
        DMCA law.
      </p>
      <div className="flex items-center justify-between">
        <div>
          <strong className="capitalize">
            <span className="text-[--text-secondary]">© </span>
            2024 CRACKCHECKER
          </strong>
        </div>
        <div className="flex gap-5">
          <a
            className="flex items-center gap-2 font-medium text-lg"
            href="https://github.com/Fopi1"
            target="_blank"
          >
            <GitHubLogoIcon className="size-6" />
            <span className="text-[--text-secondary]">
              https://github.com/Fopi1
            </span>
          </a>
          <a
            className="flex items-center gap-2 font-medium text-lg"
            href="https://github.com/Fopi1"
            target="_blank"
          >
            <Image
              src="./telegram.svg"
              alt="da"
              className="size-6"
              width={0}
              height={0}
            />
            <span className="text-[--text-secondary]">
              https://t.me/fopipopi1
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};
