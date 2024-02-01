import * as process from "process";
import { GameResponse } from "~/types";

const baseurl = process.env.BASE_URL;
const apikey = process.env.API_KEY;
const pageSize = 20;
const getGameList = async (
  page?: number,
  genre?: string,
  search?: string
): Promise<GameResponse> => {
  const url = new URL(
    `${baseurl}/games?key=${apikey}&page=${page}&page_size=${pageSize}`
  );
  if (genre) url.searchParams.set("genres", genre);
  if (search) url.searchParams.set("search", search);
  const res = await fetch(url);
  return await res.json();
};

export { getGameList };
