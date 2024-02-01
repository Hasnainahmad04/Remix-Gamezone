import * as process from "process";
import { Genre, GenreResponse } from "~/types";

const baseurl = process.env.BASE_URL;
const apikey = process.env.API_KEY;

const getGenresList = async (pageSize?: number): Promise<GenreResponse> => {
  const res = await fetch(
    `${baseurl}/genres?key=${apikey}&page_size=${pageSize || 20}`
  );
  return await res.json();
};

const getGenreDetail = async (slug: string): Promise<Genre> => {
  const res = await fetch(`${baseurl}/genres/${slug}?key=${apikey}`);
  return await res.json();
};

export { getGenresList, getGenreDetail };
