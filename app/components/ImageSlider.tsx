import React from "react";

import * as sliderLib from "react-slick";

const Slider = sliderLib.default.default;

type Image = {
  id: number;
  image: string;
};

interface Props {
  images: Image[];
}
const ImageSlider: React.FC<Props> = ({ images }) => {
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    dotsClass: "slick-dots",
  };
  return (
    <Slider {...settings} className={"min-h-[200px]"}>
      {images.map(({ id, image }) => {
        return (
          <img
            alt={"Image"}
            key={id}
            src={image}
            className={"object-contain"}
          />
        );
      })}
    </Slider>
  );
};

export default ImageSlider;
