import { PreviewScreenShot } from "~/types";
import React from "react";

interface Props {
  screenShots: PreviewScreenShot[];
}
const Screenshots: React.FC<Props> = ({ screenShots }) => {
  return (
    <div
      className={
        "mt-4 grid grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-4 grid-flow-dense"
      }
    >
      {screenShots.map(({ image }) => {
        return <img src={image} alt={"Screenshot"} className={"screenshot"} />;
      })}
    </div>
  );
};

export default Screenshots;
