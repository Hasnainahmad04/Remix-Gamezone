import * as process from "process";
import { Entity, EntityResponse, GameResponse } from "~/types";
import { fetchGameData } from "./games.action";

const baseurl = process.env.BASE_URL;
const apikey = process.env.API_KEY;

if (!apikey) throw Error("Missing api key");

const getGenresList = async (pageSize?: number): Promise<EntityResponse> => {
  try {
    const res = await fetch(
      `${baseurl}/genres?key=${apikey}&page_size=${pageSize || 20}`
    );
    return await res.json();
  } catch (e) {}
};

const getGenreDetail = async (slug: string): Promise<Entity> => {
  try {
    const res = await fetch(`${baseurl}/genres/${slug}?key=${apikey}`);
    return await res.json();
  } catch (e) {}
};

const getGamesByGenres = async (
  genre: string,
  page?: number
): Promise<GameResponse | undefined> => {
  return fetchGameData("games", {
    key: apikey,
    page: page || 1,
    page_size: 40,
    genres: genre,
  });
};

export { getGenresList, getGenreDetail, getGamesByGenres };
