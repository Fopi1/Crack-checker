import { GamesByCategories, Header } from "@/shared/components/shared";

export default function Home() {
  return (
    <>
      <Header />
      <div className="flex flex-col max-w-screen-3xl responsive mx-auto h-full">
        <GamesByCategories />
      </div>
    </>
  );
}
