import React from "react";
import { game } from "~/routes/data";

import style from "slick-carousel/slick/slick.css";
import theme from "slick-carousel/slick/slick-theme.css";
import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import { getGameList } from "~/action/games";
import { json } from "@remix-run/node";
import { useLoaderData } from "react-router";
import { GameResponse } from "~/types";
import GameCard from "~/components/GameCard";
import PaginationBar from "~/components/PaginationBar";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: style },
  { rel: "stylesheet", href: theme },
];

interface LoaderData {
  data: Awaited<GameResponse>;
}

const Index: React.FC = () => {
  const { data } = useLoaderData() as LoaderData;

  return (
    <main className={"m-4"}>
      <h2 className={"text-3xl text-black font-semibold"}>Games List</h2>
      <section
        className={"grid grid-cols-1 lg:grid-cols-4 gap-4 md:grid-cols-2 mt-10"}
      >
        {data.results.map((game) => (
          <GameCard game={game} />
        ))}
      </section>
      <PaginationBar />
    </main>
  );
};

export const loader: LoaderFunction = async () => {
  return json<LoaderData>({ data: await getGameList() });
};

export default Index;
