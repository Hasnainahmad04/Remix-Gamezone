import React from "react";
import ImageSlider from "~/components/ImageSlider";
import { Game } from "~/types";
import { Link } from "@remix-run/react";

interface Props {
  game: Game;
}

const GameCard: React.FC<Props> = ({ game }) => {
  return (
    <div
      className={
        "bg-card-dark rounded-lg overflow-hidden w-full h-full max-w-md shadow shadow-lg h-auto"
      }
    >
      <img
        src={game.background_image}
        alt={`${game.name} image`}
        className={"w-full object-contain"}
      />
      <div className={"p-4 mb-3"}>
        <div className={"flex justify-between"}>
          <Link to={`/games/${game.slug}`}>
            <span
              className={
                "text-md text-white font-[500] hover:border-b pb-1 duration-300"
              }
            >
              {game.name}
            </span>
          </Link>
          <span className={"text-md font-[500] text-primary-light"}>
            {new Date(game.released)?.getFullYear()}
          </span>
        </div>

        {game?.genres && (
          <ul
            className={
              "flex flex-wrap mt-2 gap-3 divide-x-2 divide-primary-light"
            }
          >
            {game.genres.slice(0, 3).map((genre) => {
              return (
                <li
                  key={genre.id}
                  className={"text-white underline px-2 text-xs first:pl-0"}
                >
                  <Link to={`/genres/${genre.slug}`}>{genre.name}</Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default GameCard;
