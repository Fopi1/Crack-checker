import { GamesByCategories } from '@/shared/components/gameTable';

export default function Home() {
  return (
    <div className="flex flex-col h-full">
      <GamesByCategories />
    </div>
  );
}
