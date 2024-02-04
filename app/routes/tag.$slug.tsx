import { LoaderFunction, defer } from "@remix-run/node";
import { Await, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import { getGamesByTags, getTagDetails } from "~/action/tag.action";
import Banner from "~/components/Banner";
import GameList from "~/components/GameList";
import LoadingCards from "~/components/LoadingCard";
import PaginationBar from "~/components/PaginationBar";
import { Entity, GameResponse } from "~/types";

interface LoaderData {
  tag: Awaited<Entity>;
  games: Promise<GameResponse>;
}

const Page = () => {
  const { games, tag } = useLoaderData() as LoaderData;

  return (
    <>
      <Banner detail={tag} />
      <Suspense fallback={<LoadingCards size={40} />}>
        <Await resolve={games} errorElement={<p>Error while fetching games</p>}>
          {(games) => (
            <>
              <GameList games={games?.results} />
              <PaginationBar totalCount={games.count} pageSize={40} />
            </>
          )}
        </Await>
      </Suspense>
    </>
  );
};

export const loader: LoaderFunction = async ({ params, request }) => {
  const url = new URL(request.url);
  if (!params.slug) return;
  const page = Number(url.searchParams.get("page")) || 1;
  return defer({
    games: getGamesByTags({ tag: params.slug, page }),
    tag: await getTagDetails(params.slug),
  });
};

export default Page;
