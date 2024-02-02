import { json, LoaderFunction } from "@remix-run/node";
import { getGenreDetail } from "~/action/genres.action";
import { GameResponse, Genre } from "~/types";
import { getGamesByGenres } from "~/action/games.action";
import { useLoaderData, useNavigation } from "@remix-run/react";
import Banner from "~/components/Banner";
import GameList from "~/components/GameList";
import LoadingCards from "~/components/LoadingCard";

interface LoaderData {
  genre: Awaited<Genre>;
  games: Awaited<GameResponse>;
}
const Page = () => {
  const { genre, games } = useLoaderData() as LoaderData;
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <>
      <Banner detail={genre} />
      <div className={"mt-6"}>
        {isLoading ? (
          <LoadingCards size={40} />
        ) : (
          <GameList games={games.results} />
        )}
      </div>
    </>
  );
};

export const loader: LoaderFunction = async ({ params }) => {
  if (!params?.slug) return;

  return json<LoaderData>({
    genre: await getGenreDetail(params.slug),
    games: await getGamesByGenres(params.slug),
  });
};

export default Page;
