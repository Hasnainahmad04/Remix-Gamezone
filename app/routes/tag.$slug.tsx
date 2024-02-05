import { LoaderFunction, defer } from "@remix-run/node";
import { Await, useFetcher, useLoaderData } from "@remix-run/react";
import { Suspense, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { getGamesByTags, getTagDetails } from "~/action/tag.action";
import Banner from "~/components/Banner";
import GameList from "~/components/GameList";
import LoadingCards from "~/components/LoadingCard";
import { Game } from "~/types";

const Page = () => {
  const initialData = useLoaderData<typeof loader>();
  const { tag, games: initialGames } = initialData || {};
  const fetcher = useFetcher<typeof loader>();
  const [nextPage, setNextPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);
  const [games, setGames] = useState<Game[]>([]);
  const isLoading = fetcher.state == "loading";
  const { ref: loadMoreRef, inView } = useInView({
    delay: 500,
  });

  useEffect(() => {
    if (!isLoading && inView && hasMore) {
      fetcher.load(`?page=${nextPage}`);
      setNextPage((page) => page + 1);
    }
  }, [inView]);

  useEffect(() => {
    if (fetcher.data?.games) {
      setGames((prev) => [...prev, ...fetcher.data.games.results]);
      !fetcher.data.games.next && setHasMore(false);
    }
  }, [fetcher.data]);

  return (
    <>
      {tag && <Banner detail={tag} />}
      <Suspense fallback={<LoadingCards size={40} />}>
        <Await
          resolve={initialGames}
          errorElement={<p>Error while fetching games</p>}
        >
          {(initialGames) => (
            <>
              <GameList games={[...initialGames.results, ...games]} />
              <div
                className="flex justify-center items-center my-6"
                ref={loadMoreRef}
              >
                {isLoading && inView && hasMore && (
                  <span className="inline-block text-white px-8 py-4 bg-card-dark rounded-lg">
                    loading...
                  </span>
                )}
              </div>
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
