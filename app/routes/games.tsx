import React from "react";

import style from "slick-carousel/slick/slick.css";
import theme from "slick-carousel/slick/slick-theme.css";
import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getGameList } from "~/action/games";
import { GameResponse } from "~/types";
import GameCard from "~/components/GameCard";
import PaginationBar from "~/components/PaginationBar";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: style },
  { rel: "stylesheet", href: theme },
];

interface LoaderData {
  games: Awaited<GameResponse>;
}

const Game: React.FC = () => {
  const { games } = useLoaderData() as LoaderData;

  return (
    <>
      <h1
        className={"text-[2rem] lg:text-[4rem] text-white font-semibold mt-6"}
      >
        New and trending
      </h1>
      <p className={"text-white"}>Based on player counts and release date</p>
      <div className={"space-y-6 py-8 sm:columns-2 sm:gap-6 lg:columns-3 mb-8"}>
        {games?.results?.map((game) => (
          <GameCard game={game} key={game.id} />
        ))}
      </div>
      <div className={"my-10"}>
        <PaginationBar totalCount={games.count} pageSize={20} />
      </div>
    </>
  );
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page")) || 1;

  return json<LoaderData>({ games: await getGameList(page) });
};

export default Game;
