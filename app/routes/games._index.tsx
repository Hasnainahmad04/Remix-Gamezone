import React, { FormEvent, useCallback, useEffect, useState } from "react";

import style from "slick-carousel/slick/slick.css";
import theme from "slick-carousel/slick/slick-theme.css";
import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import { json, MetaFunction } from "@remix-run/node";
import {
  Form,
  useLoaderData,
  useLocation,
  useNavigation,
  useSearchParams,
  useSubmit,
} from "@remix-run/react";
import { getGameList, getGamesBySearchQuery } from "~/action/games.action";
import { GameResponse, Genre } from "~/types";
import GameCard from "~/components/GameCard";
import PaginationBar from "~/components/PaginationBar";
import { IoIosSearch } from "react-icons/io";
import debounce from "lodash.debounce";

import { getGenreDetail } from "~/action/genres.action";
import PageTitle from "~/components/PageTitle";
import GameList from "~/components/GameList";
import LoadingCards from "~/components/LoadingCard";

interface LoaderData {
  games: Awaited<GameResponse>;
}

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: style },
  { rel: "stylesheet", href: theme },
];

export const meta: MetaFunction = () => {
  return [
    { title: "Games Zone | Video Game Discovery Site" },
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
  const pathname = useLocation();
  const navigation = useNavigation();
  const query = searchParams.get("search");

  const isLoading = navigation.state === "loading";

  return (
    <>
      <SearchField query={query} />
      <PageTitle title={"All Games"} />
      {isLoading ? (
        <LoadingCards size={40} />
      ) : (
        <GameList games={games.results} />
      )}
      <div className={"my-10"}>
        <PaginationBar totalCount={games.count} pageSize={20} />
      </div>
    </>
  );
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page")) || 1;
  const searchQuery = url.searchParams.get("search");

  console.log({ searchQuery });

  return json<LoaderData>({
    games: !searchQuery
      ? await getGameList(page)
      : await getGamesBySearchQuery(searchQuery, page),
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
