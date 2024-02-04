import * as process from "process";
import { Entity, EntityResponse, GameResponse } from "~/types";
import { fetchGameData } from "./games.action";

const baseurl = process.env.BASE_URL;
const apikey = process.env.API_KEY;

if (!apikey) throw Error("Missing api key");

const getTagList = async (
  page: number,
  pageSize?: number
): Promise<EntityResponse> => {
  const res = await fetch(
    `${baseurl}/tags?key=${apikey}&page_size=${pageSize || 20}&page=${
      page || 1
    }`
  );
  return await res.json();
};

const getTagDetails = async (slug: string): Promise<Entity> => {
  const res = await fetch(`${baseurl}/tags/${slug}?key=${apikey}`);
  return await res.json();
};

const getGamesByTags = async ({
  tag,
  page,
}: {
  tag: string;
  page?: number;
}): Promise<GameResponse | undefined> => {
  return fetchGameData("games", {
    key: apikey,
    page: page || 1,
    page_size: 40,
    tags: tag,
  });
};

export { getTagList, getTagDetails, getGamesByTags };
