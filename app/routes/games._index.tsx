import { Suspense, useEffect, useState } from "react";

import { MetaFunction, defer } from "@remix-run/node";
import {
  Await,
  Form,
  useLoaderData,
  useSearchParams,
  useSubmit,
} from "@remix-run/react";

// types
import { GameResponse } from "~/types";
import type { LoaderFunction } from "@remix-run/node";
// Actions
import {
  getGameList,
  getGamesBySearchQuery,
  getNewAndUpcomingGames,
} from "~/action/games.action";
// components
import PaginationBar from "~/components/PaginationBar";
import GameList from "~/components/GameList";
import LoadingCards from "~/components/LoadingCard";
import PageTitle from "~/components/PageTitle";
import { IoIosSearch } from "react-icons/io";
import TrendingGamesList from "~/components/TrendingGamesList";

interface LoaderData {
  allGames: Promise<GameResponse | undefined>;
  trendingGames: Awaited<GameResponse | undefined>;
}

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page")) || 1;
  const searchQuery = url.searchParams.get("search");

  const allGames = !searchQuery
    ? getGameList(page)
    : getGamesBySearchQuery(searchQuery, page);

  const trendingGames = await getNewAndUpcomingGames(1, 10);

  return defer({
    allGames,
    trendingGames,
  });
};

export const meta: MetaFunction = () => {
  return [
    { title: "Games Zone | Video Game Discovery Site" },
    {
      name: "description",
      content: "List of Video Games ♛ Keep all games in one profile",
    },
  ];
};

const Game: () => void = () => {
  const { allGames, trendingGames } = useLoaderData() as LoaderData;
  const [searchParams] = useSearchParams();
  const query = searchParams.get("search");

  return (
    <>
      <SearchField query={query} />
      {trendingGames?.results?.length && !query && (
        <section className="my-2">
          <PageTitle title={"New and Upcoming Games"} />
          <TrendingGamesList games={trendingGames.results} />
        </section>
      )}

      <PageTitle title={query ? `Search Result for "${query}"` : "All Games"} />
      <Suspense fallback={<LoadingCards size={40} />}>
        <Await
          resolve={allGames}
          errorElement={<p>Error while fetching games</p>}
        >
          {(games) => (
            <>
              <GameList games={games?.results ?? []} />
              {games?.count && (
                <div className={"my-10"}>
                  <PaginationBar totalCount={games?.count} />
                </div>
              )}
            </>
          )}
        </Await>
      </Suspense>
    </>
  );
};

export default Game;

const SearchField = ({ query }: { query: string | null }) => {
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
      <Form method={"get"} onChange={(e) => submit(e.currentTarget)}>
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
