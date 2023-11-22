import { Button } from "antd";
import FooterComp from "../../../components/footer/FooterComp";

const HomePage: React.FC = () => {
  return (
    <>
      <main className=" bg-slate-200 ">
        <div className=" container mx-auto py-5">
          <div className="bg-white grid md:grid-cols-2 rounded-md py-10 gap-10 px-5">
            <img
              src="https://marshallstorevietnam.vn/wp-content/uploads/2023/03/Middleton_Category-page_2-column-banner_desktop.png"
              alt=""
            />
            <div className="flex justify-center items-center">
              <div>
                <h2 className=" font-bold text-5xl">LOA DI ĐỘNG</h2>
                <p className="my-4 lg:pe-52">
                  Mang âm thanh đặc trưng của Marshall đi khắp mọi nơi bằng loa
                  di động và giữ cho âm nhạc của bạn tiếp tục hàng giờ liền.
                </p>
                <Button type="primary" className="bg-black" size="large">
                  Xem Thêm <i className="fa-solid fa-angle-right"></i>
                </Button>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-black to-stone-600 mt-5 grid md:grid-cols-2 rounded-md py-10 gap-10 px-5">
            <img
              src="https://marshallstorevietnam.vn/wp-content/uploads/2023/03/2-col-home-family-both.png"
              alt=""
            />
            <div className="flex justify-center items-center">
              <div>
                <h2 className=" font-bold text-5xl text-white">
                  LOA NGHE TRONG NHÀ
                </h2>
                <p className="my-4 lg:pe-52 text-slate-200">
                  Đắm chìm trong âm nhạc của bạn và trải nghiệm âm thanh sân
                  khấu lớn trong sự thoải mái tại nhà của bạn.
                </p>
                <Button type="primary" className="bg-black" size="large">
                  Xem Thêm <i className="fa-solid fa-angle-right"></i>
                </Button>
              </div>
            </div>
          </div>
          <div>
            <div className="bg-white grid md:grid-cols-2 rounded-md py-10 gap-10 px-5 mt-5">
              <img
                src="https://marshallstorevietnam.vn/wp-content/uploads/2023/03/TAINGHE-1.png"
                alt=""
              />
              <div className="flex justify-center items-center">
                <div>
                  <h2 className=" font-bold text-5xl">Tai nghe Marshall</h2>
                  <p className="my-4 lg:pe-52">
                    CHO CHÚNG TÔI ĐÔI TAI CỦA BẠN VÀ CHÚNG TÔI SẼ GIÚP BẠN NGHE
                    MỘT BÀI NHẠC
                  </p>
                  <Button type="primary" className="bg-black" size="large">
                    Xem Thêm <i className="fa-solid fa-angle-right"></i>
                  </Button>
                </div>
              </div>
            </div>
            <div className="md:grid grid-cols-3 gap-5 mt-5">
              <div className="relative overflow-hidden hover:cursor-pointer rounded-md mb-5 sm:mb-0">
                <div className="h-full">
                  <img
                    src="https://marshallstorevietnam.vn/wp-content/uploads/2023/03/in-ear-01-hero.jpeg"
                    alt=""
                    className="w-full h-full transition-transform duration-300 hover:scale-125 object-cover"
                  />
                </div>
                <div className="absolute top-0 left-0 p-10">
                  <h2 className="text-white font-bold mb-3 text-xl">
                    IN-EAR HEADPHONEs
                  </h2>
                  <Button
                    type="primary"
                    className="border-1 border-white"
                    size="large"
                  >
                    Xem Thêm <i className="fa-solid fa-angle-right"></i>
                  </Button>
                </div>
              </div>
              <div className="relative overflow-hidden hover:cursor-pointer rounded-md mb-5 sm:mb-0">
                <div className="h-full">
                  <img
                    src="https://marshallstorevietnam.vn/wp-content/uploads/2023/03/slideshow-major-iv-05.jpeg"
                    alt=""
                    className="w-full h-full transition-transform duration-300 hover:scale-125  object-cover"
                  />
                </div>
                <div className="absolute top-0 left-0 p-10">
                  <h2 className="text-white font-bold mb-3 text-xl">
                    ON-EAR HEADPHONEs
                  </h2>
                  <Button
                    type="primary"
                    className="border-1 border-white"
                    size="large"
                  >
                    Xem Thêm <i className="fa-solid fa-angle-right"></i>
                  </Button>
                </div>
              </div>
              <div className="relative overflow-hidden hover:cursor-pointer rounded-md">
                <div className="h-full">
                  <img
                    src="https://marshallstorevietnam.vn/wp-content/uploads/2023/03/marshall_campaign_monitorII-ANC_1.jpeg"
                    alt=""
                    className="w-full h-full transition-transform duration-300 hover:scale-125  object-cover"
                  />
                </div>
                <div className="absolute top-0 left-0 p-10">
                  <h2 className="text-white font-bold mb-3 text-xl">
                    OVER-EAR HEADPHONEs
                  </h2>
                  <Button
                    type="primary"
                    className="border-1 border-white"
                    size="large"
                  >
                    Xem Thêm <i className="fa-solid fa-angle-right"></i>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <FooterComp />
      </main>
    </>
  );
};
export default HomePage;
