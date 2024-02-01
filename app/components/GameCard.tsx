import React from "react";
import ImageSlider from "~/components/ImageSlider";
import { Game } from "~/types";

interface Props {
  game: Game;
}

const GameCard: React.FC<Props> = ({ game }) => {
  return (
    <div
      className={
        "bg-card-dark rounded-2xl overflow-hidden shadow shadow-lg min-h-[20rem]"
      }
    >
      <ImageSlider images={game.short_screenshots} />
      <div className={"mt-6 p-4 mb-4"}>
        <h2 className={"text-2xl text-white font-semibold"}>{game.name}</h2>
      </div>
    </div>
  );
};

export default GameCard;
