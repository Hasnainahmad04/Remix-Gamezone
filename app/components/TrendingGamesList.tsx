import TrendingGameCard from "./TrendingGameCard";
import { Game } from "~/types";

const TrendingGamesList = ({ games }: { games: Game[] | undefined }) => {
  return (
    <div className="mt-2 scrollbar-hide grid snap-x snap-proximity grid-flow-col items-center gap-4 overflow-x-scroll">
      {games?.map((game) => (
        <TrendingGameCard key={game.id} details={game} />
      ))}
    </div>
  );
};

export default TrendingGamesList;
