import { observer } from "mobx-react-lite";

import { searchStore } from "@/shared/store/searchStore";

import { GamesGroup } from "../shared/gamesGroup";

export const SearchedGames = observer(() => {
  return (
    <div className="absolute top-full mt-5 w-full bg-[--background-secondary] h-fit max-h-[800px] rounded-lg border-2 custom-scrollbar overflow-y-scroll">
      <div className="w-full h-full p-5">
        <GamesGroup games={searchStore.searchedGames} />
      </div>
    </div>
  );
});
