import { defer, LoaderFunction } from "@remix-run/node";
import { Await, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
// actions
import { getGenreDetail, getGamesByGenres } from "~/action/genres.action";
// components
import Banner from "~/components/Banner";
import GameList from "~/components/GameList";
import LoadingCards from "~/components/LoadingCard";
// types
import { GameResponse, Entity } from "~/types";

interface LoaderData {
  genre: Awaited<Entity>;
  games: Promise<GameResponse | undefined>;
}
const Page = () => {
  const { genre, games } = useLoaderData() as LoaderData;

  return (
    <>
      <Banner detail={genre} />
      <Suspense fallback={<LoadingCards size={40} />}>
        <Await resolve={games} errorElement={<p>Error while fetching games</p>}>
          {(games) => <GameList games={games?.results ?? []} />}
        </Await>
      </Suspense>
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
