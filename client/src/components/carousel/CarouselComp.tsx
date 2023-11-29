import React from "react";
import { Carousel } from "antd";

interface Image {
  pictureId?: number;
  productId?: number;
  source: string;
  type?: boolean;
}

interface CarouselCompProps {
  images: Image[];
}

const CarouselComp: React.FC<CarouselCompProps> = ({ images }) => (
  <Carousel autoplay>
    {images.map((image, index) => (
      <div key={index} className="w-full">
        <img src={image.source} alt="" className="w-full" />
      </div>
    ))}
  </Carousel>
);

export default CarouselComp;
