import { Entity } from "~/types";
import React from "react";
import { Link } from "@remix-run/react";

interface Props {
  data: Entity;
  route: string;
}
const PageCard: React.FC<Props> = ({ data, route }) => {
  return (
    <div
      style={{
        backgroundImage: `url(${data.image_background})`,
      }}
      className={`relative overflow-hidden w-full rounded-md bg-no-repeat bg-center bg-cover`}
    >
      <div className="p-8 h-48 backdrop-brightness-50 hover:backdrop-brightness-75 duration-300 ease-out transition-all">
        <Link to={`/${route}/${data.slug}`}>
          <span
            className={
              "text-2xl w-full underline text-white font-semibold text-center capitalize inline-block"
            }
          >
            {data?.name}
          </span>
        </Link>
      </div>
      <div
        className={
          "absolute bottom-0 left-0 w-full flex justify-between text-white p-3 backdrop-blur-md"
        }
      >
        <span className={"font-semibold"}>Games Count:</span>
        <span>{data?.games_count}</span>
      </div>
    </div>
  );
};
export default PageCard;
