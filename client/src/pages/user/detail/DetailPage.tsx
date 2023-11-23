import { Link, useParams } from "react-router-dom";
import FooterComp from "../../../components/footer/FooterComp";
import { Breadcrumb, Button, Input, Space } from "antd";
const DetailPage: React.FC = () => {
  const { id } = useParams();
  return (
    <>
      <main className="">
        <div>
          <Breadcrumb
            items={[
              {
                title: <Link to={"/"}>Trang chủ</Link>,
              },
              {
                title: `${id}`,
              },
            ]}
          />
        </div>
        <div className="grid sm:grid-cols-2 pb-10 container mx-auto px-1 sm:px-0">
          <div>
            <img
              src="https://marshallstorevietnam.vn/wp-content/uploads/2023/03/marshall-woburn-iii-cream-04.webp"
              alt=""
              className="w-full"
            />
          </div>
          <div>
            <h1 className=" uppercase text-3xl font-bold">MARSHALL WOBURN 3</h1>

            <div className=" bg-slate-100 mt-4 rounded-md  p-4">
              <div className="grid sm:grid-cols-2">
                <div>
                  <img
                    src="https://marshallstorevietnam.vn/wp-content/uploads/2022/12/promotions.svg"
                    title="promotions"
                    width="32"
                    height="32"
                  ></img>
                  <h3 className="font-bold ">
                    Trải nghiệm sản phẩm tại Store HN & HCM
                  </h3>
                  <p>Hà Nội: 11 Đường Ven Sông Lừ, Kim Liên, Đống Đa, HN</p>
                  <p>Hồ Chí Minh: 62 Hoa Cau, Phường 7, Phú Nhuận, TP.HCM</p>
                  <p>Hàng chính hãng Marshall, nguyên hộp, mới 100%</p>
                  <p>HN: 0928 759 555 / HCM: 0394 678 121</p>
                </div>
                <div className="flex justify-end items-center">
                  <Button
                    type="primary"
                    className=" border-solid border-black text-black"
                  >
                    Hỗ trợ thu cũ đổi mới
                  </Button>
                </div>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-5 my-4">
              <Space.Compact>
                <Button type="primary" className=" bg-black" size="large">
                  <i className="fa-solid fa-minus"></i>
                </Button>
                <Input readOnly defaultValue={1} size="large" />
                <Button type="primary" className=" bg-black" size="large">
                  <i className="fa-solid fa-plus"></i>
                </Button>
              </Space.Compact>
              <Button type="primary" size="large" className="bg-black">
                Thêm vào giỏ hàng
              </Button>
            </div>
            <div className="rounded-md border-slate-300 border p-4">
              <div className="grid grid-cols-2 mb-4">
                <div>
                  <div className="flex gap-2">
                    <img
                      src="https://marshallstorevietnam.vn/wp-content/uploads/2022/12/store.svg"
                      alt=""
                    />
                    <span className="font-bold">Nhận hàng tại Store</span>
                  </div>
                  <p>Nhận ngay trong ngày</p>
                </div>
                <div className="flex justify-end items-center">
                  <p className="font-bold">Miễn phí</p>
                </div>
              </div>
              <div className="grid grid-cols-2">
                <div>
                  <div className="flex gap-2">
                    <img
                      src="https://marshallstorevietnam.vn/wp-content/uploads/2022/12/store.svg"
                      alt=""
                    />
                    <span className="font-bold">
                      Giao hàng chuyển phát nhanh
                    </span>
                  </div>
                  <p>
                    Chuyển phát nhanh của chúng tôi sẽ giao hàng đến địa chỉ của
                    bạn
                  </p>
                </div>
                <div className="flex justify-end items-center">
                  <p className="font-bold">Miễn phí</p>
                </div>
              </div>
            </div>
            <div className="rounded-md border-slate-300 border p-4 mt-4">
              <div>
                <div className="flex justify-between">
                  <div className="flex gap-2">
                    <img
                      src="https://marshallstorevietnam.vn/wp-content/uploads/2022/12/warranty.svg"
                      alt=""
                    />
                    <span className="font-bold">Bảo hành 1 năm</span>
                  </div>
                  <Link
                    to={"/"}
                    className=" italic text-teal-500 hover:underline"
                  >
                    Chi tiết
                  </Link>
                </div>
              </div>
              <div>
                <div className="flex justify-between mt-4">
                  <div className="flex gap-2">
                    <img
                      src="https://marshallstorevietnam.vn/wp-content/uploads/2022/12/store.svg"
                      alt=""
                    />
                    <span className="font-bold">
                      Giao hàng chuyển phát nhanh
                    </span>
                  </div>
                  <Link
                    to={"/"}
                    className=" italic text-teal-500 hover:underline"
                  >
                    Chi tiết
                  </Link>
                </div>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-0 mt-4">
              <p>Payment Methods</p>
              <img
                src="https://marshallstorevietnam.vn/wp-content/uploads/2022/12/payment-methods.jpg"
                alt=""
                className="w-full"
              />
            </div>
          </div>
        </div>
        <div className=" bg-slate-200 py-10">
          <div className=" container mx-auto px-1 sm:px-0 grid sm:grid-cols-2">
            <div>
              <h2 className="font-bold">Thông tin sản phẩm</h2>
            </div>
            <div>
              <div className=" bg-white rounded-md p-4 border border-black">
                <h2 className=" font-semibold text-xl mb-4">
                  Thông số kỹ thuật
                </h2>
                <div className="flex gap-2">
                  <img
                    src="https://marshallstorevietnam.vn/wp-content/uploads/2022/12/processor.svg"
                    title="processor"
                    width="24"
                    height="24"
                  ></img>
                  <span className="font-semibold">Thông số âm thanh</span>
                </div>
                <div className="flex justify-between flex-col sm:flex-row">
                  <span className="font-semibold">Tần số</span>
                  <span>20-20.000 Hz</span>
                </div>
                <hr className="my-4" />
                <div className="flex gap-2">
                  <img
                    src="https://marshallstorevietnam.vn/wp-content/uploads/2022/12/display.svg"
                    title="display"
                    width="24"
                    height="24"
                  ></img>
                  <span className="font-semibold">Kiểm soát và kết nối</span>
                </div>
                <div className="flex justify-between flex-col sm:flex-row">
                  <span className="font-semibold">Pin</span>
                  <span>
                    Pin Li-ion tích hợp, có thể sạc lại, Sạc không dây
                  </span>
                </div>
                <div className="flex justify-between flex-col sm:flex-row">
                  <span className="font-semibold">Kết nối</span>
                  <span>Bluetooth 5.0, AUX</span>
                </div>
                <hr className="my-4" />
                <div className="flex gap-2">
                  <img
                    src="https://marshallstorevietnam.vn/wp-content/uploads/2022/12/ram.svg"
                    title="size"
                    width="24"
                    height="24"
                  ></img>
                  <span className="font-semibold">Kích thước</span>
                </div>
                <div className="flex justify-between flex-col sm:flex-row">
                  <span className="font-semibold">Trọng lượng</span>
                  <span>165g</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <FooterComp />
    </>
  );
};
export default DetailPage;
