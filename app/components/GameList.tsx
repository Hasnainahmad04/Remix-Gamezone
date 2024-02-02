import GameCard from "~/components/GameCard";
import React from "react";
import { Game } from "~/types";

const GameList = ({ games }: { games: Game[] }) => {
  return (
    <div
      className={
        "space-y-4 lg:columns-4 md:columns-2 flex md:block items-center"
      }
    >
      {games?.map((game) => (
        <GameCard game={game} key={game.id} />
      ))}
    </div>
  );
};

export default GameList;
