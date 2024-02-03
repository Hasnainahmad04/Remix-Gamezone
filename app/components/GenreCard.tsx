import { Genre } from "~/types";
import React from "react";
import { Link } from "@remix-run/react";

interface Props {
  genre: Genre;
}
const GenreCard: React.FC<Props> = ({ genre }) => {
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(32, 32, 32, 0.5), rgb(32, 32, 32) 70%), url(${genre.image_background})`,
      }}
      className={`w-[100%] rounded-xl px-8 py-12 flex flex-col items-center bg-no-repeat bg-center bg-cover`}
    >
      <Link to={`/genres/${genre.slug}`}>
        <span className={"text-2xl underline text-white font-semibold"}>
          {genre?.name}
        </span>
      </Link>

      <button className={"follow-btn"}>Follow</button>
      <div
        className={
          "w-full flex justify-between text-white border-b-[#2B271F] border-b py-3 my-2"
        }
      >
        <span className={"font-semibold"}>Popular Items:</span>
        <span>{genre?.games_count}</span>
      </div>

      {genre.games?.slice(0, 3)?.map((game) => (
        <div className={"w-full flex justify-between text-white"} key={game.id}>
          <Link to={`/games/${game.slug}`}>
            <span className={"underline"}>{game?.name}</span>
          </Link>
          <span>{game?.added}</span>
        </div>
      ))}
    </div>
  );
};
export default GenreCard;
