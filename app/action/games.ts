import * as process from "process";
import { GameResponse } from "~/types";

const baseurl = process.env.BASE_URL;
const apikey = process.env.API_KEY;
const pageSize = 20;
const getGameList = async (page?: number) => {
  const res = await fetch(
    `${baseurl}/games?page=${page || 1}&page_size=${pageSize}&key=${apikey}`
  );
  const games: GameResponse = await res.json();
  return games;
};

export { getGameList };
