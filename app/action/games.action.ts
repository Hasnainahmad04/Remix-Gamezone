import * as process from "process";
import { Game, GameResponse, ScreenshotResponse } from "~/types";

const baseurl = process.env.BASE_URL;
const apikey = process.env.API_KEY;
const pageSize = 40;

if (!apikey) throw Error("Provide Api key in env");

const fetchGameData = async (
  endpoint: string,
  queryParams: Record<string, string | number>
): Promise<GameResponse | undefined> => {
  const url = new URL(`${baseurl}/${endpoint}`);

  Object.keys(queryParams).forEach((key) =>
    url.searchParams.append(key, String(queryParams[key]))
  );

  try {
    const res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log({ error });
  }
};

const getGameList = async (
  page?: number
): Promise<GameResponse | undefined> => {
  return fetchGameData("games", {
    key: apikey,
    page: page || 1,
    page_size: pageSize,
  });
};

const getGamesByGenres = async (
  genre: string,
  page?: number
): Promise<GameResponse | undefined> => {
  return fetchGameData("games", {
    key: apikey,
    page: page || 1,
    page_size: pageSize,
    genres: genre,
  });
};

const getGamesBySearchQuery = async (
  query: string,
  page?: number
): Promise<GameResponse | undefined> => {
  return fetchGameData("games", {
    key: apikey,
    page: page || 1,
    page_size: pageSize,
    search: query,
  });
};

const getNewAndUpcomingGames = async (
  page?: number,
  limit?: number
): Promise<GameResponse | undefined> => {
  return fetchGameData("games/lists/main", {
    key: apikey,
    page: page || 1,
    page_size: limit || pageSize,
    ordering: "-released",
  });
};

const getGameDetail = async (slug: string): Promise<Game> => {
  const url = `${baseurl}/games/${slug}?key=${apikey}`;

  const res = await fetch(url);
  return await res.json();
};

const getGameScreenshots = async (
  slug: string
): Promise<ScreenshotResponse> => {
  const url = `${baseurl}/games/${slug}/screenshots?key=${apikey}`;
  const res = await fetch(url);
  return await res.json();
};

export {
  getGameList,
  getNewAndUpcomingGames,
  getGamesByGenres,
  getGamesBySearchQuery,
  getGameDetail,
  getGameScreenshots,
};
