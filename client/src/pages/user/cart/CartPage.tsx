import { Button, Input, Space } from "antd";
import FooterComp from "../../../components/footer/FooterComp";

const CartPage: React.FC = () => {
  return (
    <>
      <main className="py-10 bg-slate-200">
        <div className="container mx-auto">
          <div className="bg-white rounded-md p-5">
            <div className="hidden sm:block">
              <div className="grid sm:grid-cols-6">
                <div></div>
                <div className="flex justify-center items-center p-4 font-semibold text-xl">
                  <p>SẢN PHẨM</p>
                </div>
                <div className="flex justify-center items-center p-4 font-semibold text-xl">
                  <p>GIÁ</p>
                </div>
                <div className="flex justify-center items-center p-4 font-semibold text-xl">
                  <p>SỐ LƯỢNG</p>
                </div>
                <div className="flex justify-center items-center p-4 font-semibold text-xl">
                  <p>TẠM TÍNH</p>
                </div>
                <div></div>
              </div>
            </div>
            <div>
              <div className="grid sm:grid-cols-6">
                <div className="flex justify-center items-center p-4">
                  <img
                    src="https://marshallstorevietnam.vn/wp-content/uploads/2023/03/pos-marshall-major-iv-black-03-600x600.png"
                    alt=""
                    width={"60px"}
                    height={"60px"}
                  />
                </div>
                <div className="flex justify-center items-center p-4">
                  <span className="font-semibold">
                    MARSHALL MAJOR 4 - Black
                  </span>
                </div>
                <div className="flex justify-center items-center p-4">
                  <span className="flex sm:inline">
                    <span className="sm:hidden block">GIÁ:</span> 2.990.000
                  </span>
                </div>

                <div className="flex justify-center items-center p-4">
                  <Space.Compact>
                    <Button type="primary" className=" bg-black" size="large">
                      <i className="fa-solid fa-minus"></i>
                    </Button>
                    <Input
                      readOnly
                      defaultValue={1}
                      size="large"
                      className="text-center"
                      style={{ width: "50px" }}
                    />
                    <Button type="primary" className=" bg-black" size="large">
                      <i className="fa-solid fa-plus"></i>
                    </Button>
                  </Space.Compact>
                </div>
                <div className="flex justify-center items-center p-4">
                  <span>2.990.000</span>
                </div>
                <div className="flex justify-center items-center p-4">
                  <Button type="primary" className="bg-black">
                    <i className="fa-solid fa-xmark"></i>
                  </Button>
                </div>
              </div>
              <hr />
            </div>
            <div>
              <div className="grid sm:grid-cols-6">
                <div className="flex justify-center items-center p-4">
                  <img
                    src="https://marshallstorevietnam.vn/wp-content/uploads/2023/03/pos-marshall-major-iv-black-03-600x600.png"
                    alt=""
                    width={"60px"}
                    height={"60px"}
                  />
                </div>
                <div className="flex justify-center items-center p-4">
                  <span className="font-semibold">
                    MARSHALL MAJOR 4 - Black
                  </span>
                </div>
                <div className="flex justify-center items-center p-4">
                  <span className="flex sm:inline">
                    <span className="sm:hidden block">GIÁ:</span> 2.990.000
                  </span>
                </div>

                <div className="flex justify-center items-center p-4">
                  <Space.Compact>
                    <Button type="primary" className=" bg-black" size="large">
                      <i className="fa-solid fa-minus"></i>
                    </Button>
                    <Input
                      readOnly
                      defaultValue={1}
                      size="large"
                      className="text-center"
                      style={{ width: "50px" }}
                    />
                    <Button type="primary" className=" bg-black" size="large">
                      <i className="fa-solid fa-plus"></i>
                    </Button>
                  </Space.Compact>
                </div>
                <div className="flex justify-center items-center p-4">
                  <span>2.990.000</span>
                </div>
                <div className="flex justify-center items-center p-4">
                  <Button type="primary" className="bg-black">
                    <i className="fa-solid fa-xmark"></i>
                  </Button>
                </div>
              </div>
              <hr />
            </div>
            <div>
              <p className="font-bold text-xl mt-4">Tổng tiền: 12312321 VNĐ</p>
            </div>
            <div>
              <input type="text" name="address" id="address" />
              <Button type="primary" className="bg-black">
                Đặt hàng
              </Button>
            </div>
          </div>
        </div>
      </main>
      <FooterComp />
    </>
  );
};
export default CartPage;
