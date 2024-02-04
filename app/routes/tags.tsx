import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getTagList } from "~/action/tag.action";
import PageCard from "~/components/PageCard";
import PageListContainer from "~/components/PageListContainer";
import PageTitle from "~/components/PageTitle";
import { EntityResponse } from "~/types";

interface LoaderData {
  tags: Awaited<EntityResponse>;
}
const Page = () => {
  const { tags } = useLoaderData<LoaderData>();
  return (
    <>
      <PageTitle title="Tags" />
      <PageListContainer>
        {tags.results.map((tag) => (
          <PageCard key={tag.id} data={tag} route="tag" />
        ))}
      </PageListContainer>
    </>
  );
};

export const loader: LoaderFunction = async () => {
  return json<LoaderData>({ tags: await getTagList(1, 20) });
};

export default Page;
