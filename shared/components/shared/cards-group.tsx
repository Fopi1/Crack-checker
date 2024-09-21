import { FC } from "react";
import { Card } from "./card";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

export const CardsGroup: FC<Props> = ({ className }) => {
  return (
    <div
      className={cn(
        "flex flex-wrap gap-6 items-center justify-center mx-auto responsive",
        className
      )}
    >
      <Card
        title={"STAR WARS Jedi Survivor™ - Deluxe Edition"}
        isCracked={true}
      />
      <Card title={"Black Myth: Wukong"} isCracked={false} />
      <Card title={"Ghost of Tsushima™ Director's Cut"} isCracked={true} />
      <Card
        title={"STAR WARS Jedi Survivor™ - Deluxe Edition"}
        isCracked={true}
      />
      <Card title={"Black Myth: Wukong"} isCracked={false} />
      <Card title={"Ghost of Tsushima™ Director's Cut"} isCracked={true} />
    </div>
  );
};
