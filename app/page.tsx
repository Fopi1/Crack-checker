import { CardsGroup, Header } from "@/shared/components/shared";
import { GameFilterHeader } from "@/shared/components/shared";
import { Users } from "lucide-react";

export default function Home() {
  return (
    <>
      <Header />
      <div className="flex flex-col max-w-screen-2xl responsive mx-auto h-full">
        <GameFilterHeader
          title={"Popular games"}
          icon={<Users className="text-blue-500" />}
        />
        <CardsGroup className="lg:grid-cols-3" />
        
      </div>
    </>
  );
}
