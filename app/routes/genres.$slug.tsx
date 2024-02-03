import { defer, LoaderFunction } from "@remix-run/node";
import { Await, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
// actions
import { getGamesByGenres } from "~/action/games.action";
import { getGenreDetail } from "~/action/genres.action";
// components
import Banner from "~/components/Banner";
import GameList from "~/components/GameList";
import LoadingCards from "~/components/LoadingCard";
// types
import { GameResponse, Genre } from "~/types";

interface LoaderData {
  genre: Awaited<Genre>;
  games: Promise<GameResponse | undefined>;
}
const Page = () => {
  const { genre, games } = useLoaderData() as LoaderData;

  return (
    <>
      <Banner detail={genre} />
      <div className={"mt-6"}>
        <Suspense fallback={<LoadingCards size={40} />}>
          <Await
            resolve={games}
            errorElement={<p>Error while fetching games</p>}
          >
            {(games) => <GameList games={games?.results ?? []} />}
          </Await>
        </Suspense>
      </div>
    </>
  );
};

export const loader: LoaderFunction = async ({ params }) => {
  if (!params?.slug) return;

  return defer({
    games: getGamesByGenres(params.slug),
    genre: await getGenreDetail(params.slug),
  });
};

export default Page;
