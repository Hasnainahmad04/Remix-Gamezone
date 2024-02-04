import { json, LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getGenresList } from "~/action/genres.action";
import PageCard from "~/components/PageCard";
import PageListContainer from "~/components/PageListContainer";
import PageTitle from "~/components/PageTitle";
import { EntityResponse } from "~/types";

interface LoaderRes {
  genres: Awaited<EntityResponse>;
}

export const meta: MetaFunction = () => {
  return [
    { title: "Genres | Video Game Discovery Site" },
    {
      name: "description",
      content: "List of Game Categories",
    },
  ];
};

const Page = () => {
  const { genres } = useLoaderData() as LoaderRes;
  return (
    <>
      <PageTitle title={"Genres"} />

      <PageListContainer>
        {genres?.results?.map((genre) => (
          <PageCard data={genre} key={genre.id} route="genre" />
        ))}
      </PageListContainer>
    </>
  );
};

export const loader: LoaderFunction = async () => {
  return json<LoaderRes>({ genres: await getGenresList(20) });
};
export default Page;
