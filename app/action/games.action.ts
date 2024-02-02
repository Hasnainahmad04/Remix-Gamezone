import * as process from "process";
import {
  Game,
  GameResponse,
  PreviewScreenShot,
  ScreenshotResponse,
} from "~/types";

const baseurl = process.env.BASE_URL;
const apikey = process.env.API_KEY;
const pageSize = 40;

const fetchGameData = async (
  endpoint: string,
  queryParams: Record<string, string | number>
): Promise<GameResponse> => {
  const url = new URL(`${baseurl}/${endpoint}`);

  Object.keys(queryParams).forEach((key) =>
    url.searchParams.append(key, String(queryParams[key]))
  );

  const res = await fetch(url);
  return await res.json();
};

const getGameList = async (page?: number): Promise<GameResponse> => {
  return fetchGameData("games", {
    key: apikey,
    page: page || 1,
    page_size: pageSize,
  });
};

const getGamesByGenres = async (
  genre: string,
  page?: number
): Promise<GameResponse> => {
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
): Promise<GameResponse> => {
  return fetchGameData("games", {
    key: apikey,
    page: page || 1,
    page_size: pageSize,
    search: query,
  });
};

const getNewAndUpcomingGames = async (page?: number): Promise<GameResponse> => {
  return fetchGameData("games", {
    key: apikey,
    page: page || 1,
    page_size: pageSize,
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
