import { Link, useParams } from "react-router-dom";
import FooterComp from "../../../components/footer/FooterComp";
import { Breadcrumb, Button, Input, Space } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import numeral from "numeral";
import HeaderComp from "../../../components/header/HeaderComp";
import CarouselComp from "../../../components/carousel/CarouselComp";
import { Helmet } from "react-helmet";

interface Product {
  productId: number;
  name: string;
  price: string;
  quantity: number;
  wattage: number;
  pin: string;
  connect: string;
  weight: number;
  description: string;
  categoryId: string;
  createAt: string;
  category: {
    categoryId: string;
    name: string;
    description: string;
  };
}

interface Image {
  pictureId: number;
  productId: number;
  source: string;
  type: boolean;
}

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  active: boolean;
}

interface CartItem {
  productId: number;
  userId: number;
  productName: string;
  price: number;
  image: string;
  quantity: number;
}

const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const apiURL = import.meta.env.VITE_API_URL;
  const accessToken = localStorage.getItem("access_token") || "";
  const userStorageData = localStorage.getItem("user");
  const user: User = userStorageData
    ? JSON.parse(userStorageData)
    : { id: "", name: "", email: "", phone: "", role: "", active: false };

  const [data, setData] = useState<Product | null>(null);
  const [images, setImages] = useState<Image[]>([]);
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
  const fetchData = async () => {
    try {
      const response = await axios.get(`${apiURL}/products/${id}`);
      const imagesResponse = await axios.get(`${apiURL}/pictures/${id}`);
      setData(response.data);
      setImages(imagesResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const productAvatar = images?.find((e) => e.type === true);

  const handleIncreaseQuantity = () => {
    setSelectedQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (selectedQuantity > 1) {
      setSelectedQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleAddToCart = () => {
    if (user && accessToken && data && id) {
      const cartItem = {
        productId: +id,
        userId: user.id,
        productName: data.name,
        price: +data.price,
        image:
          productAvatar?.source ||
          "https://static.vecteezy.com/system/resources/previews/005/337/799/non_2x/icon-image-not-found-free-vector.jpg",
        quantity: selectedQuantity,
      };
      const existingCartItems: CartItem[] = JSON.parse(
        localStorage.getItem("cartItems") || "[]"
      );

      const itemIndex = existingCartItems.findIndex(
        (item: CartItem) => item.productId === cartItem.productId
      );

      if (itemIndex !== -1) {
        existingCartItems[itemIndex].quantity += selectedQuantity;
      } else {
        existingCartItems.push(cartItem);
      }

      localStorage.setItem("cartItems", JSON.stringify(existingCartItems));

      Swal.fire({
        icon: "success",
        title: "Sản phẩm đã được thêm vào giỏ hàng",
        timer: 1000,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Bạn phải đăng nhập để thêm sản phẩm vào giỏ hàng",
        timer: 1000,
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>{data?.name}</title>
      </Helmet>
      <HeaderComp />
      <main className="">
        <div className="mt-24 container mx-auto">
          <Breadcrumb
            items={[
              {
                title: <Link to={"/"}>Trang chủ</Link>,
              },
              {
                title: <Link to={"/"}>{data?.category.name}</Link>,
              },
              {
                title: `${data?.name}`,
              },
            ]}
          />
        </div>
        <div className="grid sm:grid-cols-2 pb-10 container mx-auto px-1 sm:px-0">
          <div>
            <CarouselComp images={images} />
          </div>
          <div>
            <h1 className=" uppercase text-3xl font-bold">{data?.name}</h1>

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

            <p className=" text-4xl my-4 font-semibold">
              {numeral(data?.price).format("0, ")} VNĐ
            </p>

            <div className="grid sm:grid-cols-2 gap-5 my-4">
              <Space.Compact>
                <Button
                  type="primary"
                  className=" bg-black"
                  size="large"
                  onClick={handleDecreaseQuantity}
                  disabled={selectedQuantity === 1}
                >
                  <i className="fa-solid fa-minus"></i>
                </Button>
                <Input readOnly value={selectedQuantity} size="large" />
                <Button
                  type="primary"
                  className=" bg-black"
                  size="large"
                  onClick={handleIncreaseQuantity}
                >
                  <i className="fa-solid fa-plus"></i>
                </Button>
              </Space.Compact>
              <Button
                type="primary"
                size="large"
                className="bg-black"
                onClick={handleAddToCart}
              >
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
          <div className=" container mx-auto px-1 sm:px-0 grid sm:grid-cols-2 gap-2">
            <div className="bg-white p-4 rounded-md">
              <h2 className="font-bold">Thông tin sản phẩm</h2>
              <div>
                <p>{data?.description}</p>
              </div>
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
                  <span className="font-semibold">Công suất</span>
                  <span>{data?.wattage} Watt</span>
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
                <div className="flex justify-between flex-col sm:flex-row gap-1">
                  <span className="font-semibold">Pin</span>
                  <span>{data?.pin}</span>
                </div>
                <div className="flex justify-between flex-col sm:flex-row gap-1">
                  <span className="font-semibold">Kết nối</span>
                  <span>{data?.connect}</span>
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
                  <span>{data?.weight} g</span>
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
