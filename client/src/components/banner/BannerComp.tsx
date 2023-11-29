import React from "react";
import { Carousel } from "antd";

const BannerComp: React.FC = () => (
  <Carousel autoplay>
    <div>
      <img
        src="https://file.hstatic.net/1000347078/collection/banner_marshall_copy_f46c3229173f40bfac0c3bbec714f704.jpg"
        alt=""
        className="mx-auto h-full w-full  aspect-video rounded-md"
      />
    </div>
    <div>
      <img
        src="https://thanhlammedia.vn/wp-content/uploads/2021/12/banner-marshall-3-3.jpg"
        alt=""
        className="mx-auto h-full w-full aspect-video  rounded-md"
      />
    </div>
    <div>
      <img
        src="https://metapod.com/cdn/shop/collections/marshall_banner_2600x.webp?v=1686907295"
        alt=""
        className="mx-auto h-full  aspect-video  rounded-md"
      />
    </div>
    <div>
      <img
        src="https://file.hstatic.net/1000288298/collection/banner-marshall-home-1_91563e4efbbf4792917143d736fc9488.jpg"
        alt=""
        className="mx-auto h-full  aspect-video  rounded-md"
      />
    </div>
  </Carousel>
);

export default BannerComp;
