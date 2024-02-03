import GameCard from "~/components/GameCard";
import { Game } from "~/types";

const GameList = ({ games }: { games: Game[] }) => {
  return (
    <div
      className={
        "mt-4 space-y-4 lg:columns-4 md:columns-2 flex md:block flex-col items-center"
      }
    >
      {games?.map((game) => (
        <GameCard game={game} key={game.id} />
      ))}
    </div>
  );
};

export default GameList;
