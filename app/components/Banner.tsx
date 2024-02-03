import { Game, Genre } from "~/types";
import React, { useState } from "react";

interface Props {
  detail: Genre | Game;
}
const Banner: React.FC<Props> = ({ detail }) => {
  const background =
    "image_background" in detail
      ? detail.image_background
      : detail.background_image;

  return (
    <div
      className={
        "w-full bg-center bg-cover bg-no-repeat mt-6 overflow-hidden rounded-md"
      }
      style={{
        backgroundImage: `linear-gradient(rgba(32, 32, 32, 0.3), rgb(32, 32, 32) 80%), url(${background})`,
      }}
    >
      <div className={"w-full p-4 h-auto"}>
        <h2 className={"text-white text-[3rem] font-bold"}>{detail.name}</h2>
        <Description description={detail.description ?? ""} />
      </div>
    </div>
  );
};

const Description = ({ description }: { description: string }) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <>
      <span className={"text-white/70 text-lg"}>About</span>
      <div
        className={`max-w-lg mt-1 space-y-4 text-white/70 text-sm  ${
          showMore ? "h-auto overflow-y-visible" : "h-20 overflow-y-hidden "
        }`}
        dangerouslySetInnerHTML={{ __html: description }}
      />
      <button
        className={"text-white/70 text-sm mt-2 "}
        onClick={() => setShowMore((show) => !show)}
      >
        {showMore ? "Show less" : "Read More"}
      </button>
    </>
  );
};

export default Banner;
