import React, { FormEvent, useCallback, useEffect, useState } from "react";

import style from "slick-carousel/slick/slick.css";
import theme from "slick-carousel/slick/slick-theme.css";
import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import { json, MetaFunction } from "@remix-run/node";
import {
  Form,
  useLoaderData,
  useNavigation,
  useSearchParams,
  useSubmit,
} from "@remix-run/react";
import { getGameList } from "~/action/games.action";
import { GameResponse, Genre } from "~/types";
import GameCard from "~/components/GameCard";
import PaginationBar from "~/components/PaginationBar";
import { IoIosSearch } from "react-icons/io";
import debounce from "lodash.debounce";

import { getGenreDetail } from "~/action/genres.action";

interface LoaderData {
  games: Awaited<GameResponse>;
  genre?: Genre;
}

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: style },
  { rel: "stylesheet", href: theme },
];

export const meta: MetaFunction = () => {
  return [
    { title: "Games | Video Game Discovery Site" },
    {
      name: "description",
      content:
        "List of Video Games ♛ Keep all games in one profile ✔ See what friends are playing, and find your next great game",
    },
  ];
};

const Game: () => void = () => {
  const { games, genre } = useLoaderData() as LoaderData;

  const [searchParams] = useSearchParams();

  const isGenre = searchParams.has("genres");
  const query = searchParams.get("search");
  const navigation = useNavigation();

  return (
    <>
      <SearchField query={query} />
      <h1 className={"text-[2rem] lg:text-[4rem] text-white font-semibold"}>
        {`${isGenre ? genre?.name : "All"} Games`}
      </h1>

      {navigation.state == "loading" ? (
        <span className={"text-[#737373] text-xl"}>loading....</span>
      ) : (
        <>
          <div
            className={"space-y-6 py-8 sm:columns-2 sm:gap-6 lg:columns-3 mb-8"}
          >
            {games?.results?.map((game) => (
              <GameCard game={game} key={game.id} />
            ))}
          </div>
          <div className={"my-10"}>
            <PaginationBar totalCount={games.count} pageSize={20} />
          </div>
        </>
      )}
    </>
  );
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page")) || 1;

  const genre = url.searchParams.get("genres");
  const search = url.searchParams.get("search");
  const isGenre = url.searchParams.has("genres");

  return json<LoaderData>({
    games: await getGameList(page, genre, search),
    ...(isGenre ? { genre: await getGenreDetail(genre) } : {}),
  });
};

export default Game;

const SearchField = ({ query }: { query: string }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const submit = useSubmit();

  useEffect(() => {
    setSearchQuery(query || "");
  }, [query]);

  return (
    <div className={"relative"}>
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <IoIosSearch className={"text-[#737373] w-5 h-5"} />
      </div>
      <Form
        method={"get"}
        onChange={(e) => debounce(submit(e.currentTarget), 500)}
      >
        <input
          defaultValue={searchQuery}
          placeholder={"Search Games"}
          className={
            "py-3 ps-10 rounded-lg bg-card-dark focus:outline-none text-sm shadow text-[#737373] w-full my-3"
          }
          onChange={(e) => setSearchQuery(e.currentTarget.value)}
          name={"search"}
        />
      </Form>
    </div>
  );
};
