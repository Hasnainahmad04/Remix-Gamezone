import { Link } from "@remix-run/react";
import { Game } from "~/types";

import placeholderImage from "../../public/placeholder.avif";
const TrendingGameCard = ({ details }: { details: Game }) => {
  return (
    <div className="snap-start shadow-md relative overflow-hidden h-full w-72 md:h-60 md:w-96 max-w-md rounded-md">
      <img
        src={details.background_image || placeholderImage}
        alt={details.name}
        className="h-full"
      />
      <div className="absolute backdrop-blur-md bottom-0 w-full flex p-3 gap-x-3 justify-between items-center">
        <Link
          to={`/game/${details.slug}`}
          className="capitalize text-white text-sm underline-offset-1 font-medium"
        >
          {details.name}
        </Link>

        {details.released && (
          <span className="text-white/50 text-sm">
            {new Date(details.released).getFullYear()}
          </span>
        )}
      </div>
    </div>
  );
};

export default TrendingGameCard;
