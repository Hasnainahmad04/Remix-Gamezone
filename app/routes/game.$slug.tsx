import { defer, LoaderFunction } from "@remix-run/node";
import { Await, Link, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";

// types
import { Game, GameResponse, ScreenshotResponse } from "~/types";

// actions
import {
  getGameDetail,
  getGameScreenshots,
  getGameSeries,
} from "~/action/games.action";

// components
import Banner from "~/components/Banner";
import GameList from "~/components/GameList";
import LoadingCards from "~/components/LoadingCard";
import Screenshots from "~/components/Screenshots";

// helper
import { formatDate } from "~/utils";

interface LoaderData {
  game: Awaited<Game>;
  screenShots: Promise<ScreenshotResponse>;
  gameSeries: Promise<GameResponse | undefined>;
}

const ratingBackgroundColors: Record<string, string> = {
  exceptional: "from-green-900  to-green-600",
  recommended: "from-yellow-900  to-yellow-600",
  meh: "from-orange-900  to-orange-600",
  skip: "from-red-900  to-red-600",
};

const Page = () => {
  const { game, screenShots, gameSeries } = useLoaderData() as LoaderData;
  return (
    <>
      <Banner detail={game} />

      {/* ScreenShots */}

      <section className={"my-6"}>
        <h2 className={" text-white font-bold text-3xl"}>
          Preview Screenshots
        </h2>
        <Suspense fallback={<ScreeshotSkeleton />}>
          <Await resolve={screenShots} errorElement={<p>Error.....</p>}>
            {(images) => <Screenshots screenShots={images.results} />}
          </Await>
        </Suspense>
      </section>

      {/* Details  */}
      <section className={"my-6 bg-card-dark p-4 rounded-md"}>
        <h2 className={"text-white font-bold text-2xl"}>Details</h2>

        <div className={"flex gap-4 flex-wrap"}>
          {game?.platforms && (
            <div className={"flex gap-2 items-baseline"}>
              <span className={"text-primary-light"}>Platforms:</span>
              <ul className={"flex gap-1 flex-wrap"}>
                {game?.platforms?.map(({ platform }, index) => (
                  <li className={"text-white text-sm"} key={platform.id}>
                    {platform.name}
                    {index === game.platforms!.length - 1 ? "." : ","}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {!!game?.genres.length && (
            <div className={"flex gap-2 items-baseline"}>
              <span className={"text-primary-light"}>Genre:</span>
              <ul className={"flex gap-1 flex-wrap"}>
                {game.genres.map((genre, index) => (
                  <li
                    className={
                      "text-white underline text-sm hover:text-white/70 duration-200 "
                    }
                    key={genre.id}
                  >
                    <Link to={`/genre/${genre.slug}`}>
                      {genre.name}
                      {index == game.genres?.length - 1 ? "." : ","}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {game?.released && (
            <GameDetail name={"Released"} info={formatDate(game.released)} />
          )}

          <GameDetail name={"Rating"} info={`${game.rating} / 5`} />

          {!!game?.tags.length && (
            <div className={"flex gap-2 items-baseline"}>
              <span className={"text-primary-light"}>Tags:</span>
              <ul className={"flex gap-1 flex-wrap"}>
                {game.tags.map((tag, index) => (
                  <li
                    className={
                      "text-white underline text-sm hover:text-white/70 duration-200 "
                    }
                    key={tag.id}
                  >
                    <Link to={`/tag/${tag.slug}`}>
                      {tag.name}
                      {index == game.genres?.length - 1 ? "." : ","}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="w-full flex overflow-hidden rounded-md">
            {game.ratings &&
              game.ratings.map(({ title, id, percent }) => {
                return (
                  <div
                    key={id}
                    style={{ width: `${percent}%` }}
                    className={`bg-gradient-to-t ${
                      title in ratingBackgroundColors
                        ? ratingBackgroundColors[title]
                        : ""
                    }`}
                  >
                    <span className="text-white capitalize p-2 md:p-4 inline-block">
                      {title}
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
      </section>

      {/* Game series */}

      <section className={"my-6 rounded-md"}>
        <h2 className={"text-white font-bold text-2xl"}>Game Series</h2>

        <Suspense fallback={<LoadingCards size={8} />}>
          <Await
            resolve={gameSeries}
            errorElement={
              <p className="text-white">Error while fetching Games</p>
            }
          >
            {(gameSeries) => (
              <>
                {gameSeries?.results.length ? (
                  <GameList games={gameSeries?.results ?? []} />
                ) : (
                  <div className="bg-card-dark p-4 text-white/50 rounded-md my-2">
                    No Game in The Series
                  </div>
                )}
              </>
            )}
          </Await>
        </Suspense>
      </section>
    </>
  );
};

const GameDetail = ({ name, info }: { name: string; info: string }) => {
  return (
    <div className={"flex gap-2 items-baseline"}>
      <span className={"text-primary-light"}>{name}:</span>
      <span className={"text-white text-sm"}>{info}</span>
    </div>
  );
};

const ScreeshotSkeleton = () => {
  const emptyArray = Array.from({ length: 6 }, () => Math.random());
  return (
    <ul className="mt-4 grid grid-flow-dense grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-4">
      {emptyArray.map((el) => (
        <li
          key={el}
          className="animate-pulse space-y-8 md:flex md:items-center md:space-y-0 md:space-x-8"
        >
          <div className="flex h-24 w-full items-center justify-center rounded bg-[#353535] sm:w-96 md:h-40 ">
            <svg
              className="h-12 w-12 text-gray-200"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 640 512"
            >
              <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
            </svg>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Page;

export const loader: LoaderFunction = async ({ params }) => {
  if (!params?.slug) return;
  const gameSeries = getGameSeries({ slug: params.slug });
  const screenShots = getGameScreenshots(params.slug);
  const game = await getGameDetail(params.slug);
  return defer({
    gameSeries,
    game,
    screenShots,
  });
};
