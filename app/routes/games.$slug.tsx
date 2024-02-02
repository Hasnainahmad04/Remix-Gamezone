import { json, LoaderFunction } from "@remix-run/node";
import { getGameDetail, getGameScreenshots } from "~/action/games.action";
import { Game, PreviewScreenShot } from "~/types";
import { Link, useLoaderData } from "@remix-run/react";
import Banner from "~/components/Banner";
import PageTitle from "~/components/PageTitle";
import Screenshots from "~/components/Screenshots";
import { formatDate } from "~/utils";

interface LoaderData {
  game: Awaited<Game>;
  screenShots: Awaited<PreviewScreenShot[]>;
}

const image =
  "https://media.rawg.io/media/screenshots/13c/13c20cdefc96ee8f1a2bbfdfecc9c546.jpg";
const Page = () => {
  const { game, screenShots } = useLoaderData() as LoaderData;
  return (
    <>
      <Banner detail={game} />
      <section className={"my-6"}>
        <h2 className={" text-white font-bold text-3xl"}>
          Preview Screenshots
        </h2>
        <Screenshots screenShots={screenShots} />
      </section>
      <section className={"my-6 bg-card-dark p-4 rounded-md"}>
        <h2 className={"text-white font-bold text-2xl"}>Details</h2>

        <div className={"flex gap-4 flex-wrap"}>
          {game.platforms?.length && (
            <div className={"flex gap-2 items-baseline"}>
              <span className={"text-primary-light"}>Platforms:</span>
              <ul className={"flex gap-1"}>
                {game.platforms.map(({ platform }, index) => (
                  <li className={"text-white text-sm"}>
                    {platform.name}
                    {index == game.platforms?.length - 1 ? "." : ","}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {game?.genres?.length && (
            <div className={"flex gap-2 items-baseline"}>
              <span className={"text-primary-light"}>Genre:</span>
              <ul className={"flex gap-1"}>
                {game.genres.map((genre, index) => (
                  <li className={"text-white underline text-sm"}>
                    <Link to={`/genres/${genre.slug}`}>
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
          {game?.rating && (
            <GameDetail name={"Rating"} info={`${game.rating} / 5`} />
          )}
        </div>
      </section>
    </>
  );
};

export const loader: LoaderFunction = async ({ params }) => {
  if (!params?.slug) return;
  const game = await getGameDetail(params.slug);
  const screenShots = await getGameScreenshots(params.slug);
  return json<LoaderData>({ game, screenShots: screenShots.results });
};

const GameDetail = ({ name, info }: { name: string; info: string }) => {
  return (
    <div className={"flex gap-2 items-baseline"}>
      <span className={"text-primary-light"}>{name}:</span>
      <span className={"text-white text-sm"}>{info}</span>
    </div>
  );
};

export default Page;
