import { LoaderFunction, json } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { getTagList } from "~/action/tag.action";
import PageCard from "~/components/PageCard";
import PageListContainer from "~/components/PageListContainer";
import PageTitle from "~/components/PageTitle";
import { Entity, EntityResponse } from "~/types";

interface LoaderData {
  tags: Awaited<EntityResponse | undefined>;
}
const Page = () => {
  const initialData = useLoaderData<LoaderData>();
  const { data, state, load } = useFetcher<LoaderData>();
  const { ref, inView } = useInView({ delay: 500 });
  const [nextPage, setNextPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);
  const [tags, setTags] = useState<Entity[]>([]);
  const { tags: initialTags } = initialData || {};

  const isLoading = state == "loading";

  useEffect(() => {
    if (!isLoading && inView && hasMore) {
      load(`?page=${nextPage}`);
      setNextPage((page) => page + 1);
    }
  }, [inView]);

  useEffect(() => {
    if (data?.tags && state == "idle") {
      setTags((prev) => [...prev, ...data.tags!.results]);
      if (!data.tags?.next) setHasMore(false);
    }
  }, [data]);

  return (
    <>
      <PageTitle title="Tags" />
      <PageListContainer>
        {initialTags?.results &&
          [...initialTags.results, ...tags].map((tag) => (
            <PageCard key={tag.id} data={tag} route="tag" />
          ))}
      </PageListContainer>

      <div ref={ref} className="flex w-full my-6 justify-center">
        {isLoading && inView && (
          <span className="px-8 py-4 rounded-lg bg-card-dark text-white">
            Loading...
          </span>
        )}
      </div>
    </>
  );
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page")) || 1;
  return json<LoaderData>({ tags: await getTagList(page, 20) });
};

export default Page;
