import { Link } from "@remix-run/react";
import React from "react";
import { Genre } from "~/types";
import { TfiArrowCircleDown } from "react-icons/tfi";

interface Props {
  genres: Genre[];
}
const GenreList: React.FC<Props> = ({ genres }) => {
  return (
    <ul className={"space-y-1"}>
      {genres?.map((genre) => (
        <ListItem genre={genre} key={genre.id} />
      ))}
      <li>
        <Link
          to={"/genres"}
          className={
            "p-2 flex gap-3 items-center hover:bg-card-dark rounded-md duration-300 ease-in text-[#737373] hover:text-white"
          }
        >
          <TfiArrowCircleDown className={"w-8 h-8 text-white"} />
          <span>View All</span>
        </Link>
      </li>
    </ul>
  );
};

const ListItem = ({ genre }: { genre: Genre }) => {
  return (
    <li>
      <Link
        to={`/games?genres=${genre.slug}`}
        className={
          "flex gap-2 items-center hover:bg-card-dark p-2 duration-300 ease-in rounded-md"
        }
      >
        <img
          src={genre?.image_background}
          alt={`${genre.name} image`}
          className={"w-[2rem] h-[2rem] rounded-lg"}
        />
        <span className={"text-white text-[1rem]"}>{genre.name}</span>
      </Link>
    </li>
  );
};

export default GenreList;
