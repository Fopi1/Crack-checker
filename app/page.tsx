import { CardsGroup, Header } from "@/shared/components/shared";

export default function Home() {
  return (
    <>
      <Header />
      <div className="max-w-screen-2xl lg:max-lg:max-w-screen-lg mx-auto h-full py-20">
        <CardsGroup />
      </div>
    </>
  );
}
