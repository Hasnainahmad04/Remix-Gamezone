import Masonry from "react-masonry-css";
import GameCard from "~/components/GameCard";
import { Game } from "~/types";

const GameList = ({ games }: { games: Game[] }) => {
  return (
    <Masonry
      className="flex gap-4 my-6"
      columnClassName="space-y-4"
      breakpointCols={{
        default: 4,
        1100: 2,
        500: 1,
      }}
    >
      {games?.map((game) => (
        <GameCard game={game} key={game.id} />
      ))}
    </Masonry>
  );
};

export default GameList;
