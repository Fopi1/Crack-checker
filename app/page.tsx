import { GamesByCategories, Header } from "@/shared/components/shared";
import { Footer } from "@/shared/components/shared/footer";

export default function Home() {
  return (
    <>
      <Header />
      <div className="flex flex-col mx-auto h-full">
        <GamesByCategories />
      </div>
      <Footer />
    </>
  );
}
