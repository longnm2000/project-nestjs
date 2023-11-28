import { Button, Form, Input, Space } from "antd";
import FooterComp from "../../../components/footer/FooterComp";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import numeral from "numeral";
import axios, { AxiosResponse } from "axios";
import Swal, { SweetAlertOptions } from "sweetalert2";

interface CartItem {
  productId: string;
  userId: string;
  productName: string;
  price: number;
  image: string;
  quantity: number;
}

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  active: boolean;
}

interface OrderData {
  address: string;
}

const schema = yup.object().shape({
  address: yup.string().required("Địa chỉ giao hàng không được trống"),
});

const CartPage: React.FC = () => {
  const apiURL = import.meta.env.VITE_API_URL;
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const accessToken = localStorage.getItem("access_token") || "";
  const userStorageData = localStorage.getItem("user");
  const user: User = userStorageData
    ? JSON.parse(userStorageData)
    : { id: -1, name: "", email: "", phone: "", role: "", active: false };
  useEffect(() => {
    const storedCartItems = JSON.parse(
      localStorage.getItem("cartItems") || "[]"
    );
    setCartItems(storedCartItems);
  }, []);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  console.log(errors?.address);

  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      "Content-Type": "application/json",
    },
  });

  const handleRemoveItem = (index: number) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(index, 1);
    setCartItems(updatedCartItems);

    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  const getTotalPrice = cartItems.reduce((total, item) => {
    if (+user.id === +item.userId) {
      return total + item.quantity * item.price;
    }
    return total;
  }, 0);

  const handleQuantityChange = (index: number, newQuantity: number) => {
    if (newQuantity >= 1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[index].quantity = newQuantity;
      setCartItems(updatedCartItems);

      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    }
  };

  const handlePlaceOrder = async (data: OrderData) => {
    console.log(data);

    const orderDetailsArray = cartItems.filter(
      (item) => +user.id === +item.userId
    );
    try {
      console.log(orderDetailsArray);
      const response: AxiosResponse = await axiosInstance.post(
        `${apiURL}/order`,
        {
          totalAmount: getTotalPrice,
          shippingAddress: data.address,
          orderDetails: orderDetailsArray,
          user: user.id,
        }
      );

      switch (response.data?.status) {
        case 201:
          Swal.fire({
            icon: "success",
            title: "Đặt hàng thành công",
            timer: 2000,
          }).then(() => {
            const deletedCart = cartItems.filter((e) => +e.userId !== +user.id);
            setCartItems(deletedCart);
            localStorage.setItem("cartItems", JSON.stringify(deletedCart));
          });
          break;
        case 203:
          Swal.fire({
            icon: "error",
            title: "Tài khoản đã bị khoá",
            timer: 2000,
          });
          break;
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error,
      } as SweetAlertOptions);
    }
  };

  return (
    <>
      <main className="py-10 bg-slate-200">
        <div className="container mx-auto">
          <div className="bg-white rounded-md p-5">
            {cartItems.filter((e) => +e.userId === +user.id).length > 0 &&
            !!user &&
            !!accessToken ? (
              <>
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
                {cartItems.map((e: CartItem, i: number) => {
                  if (+e.userId === +user.id) {
                    return (
                      <div key={i}>
                        <div className="grid sm:grid-cols-6">
                          <div className="flex justify-center items-center p-4">
                            <img
                              src={e.image}
                              alt=""
                              width={"60px"}
                              height={"60px"}
                            />
                          </div>
                          <div className="flex justify-center items-center p-4">
                            <span className="font-semibold">
                              {e.productName}
                            </span>
                          </div>
                          <div className="flex justify-center items-center p-4">
                            <span className="flex sm:inline">
                              <span className="sm:hidden block">GIÁ:</span>{" "}
                              {numeral(e.price).format("0, ")}
                            </span>
                          </div>

                          <div className="flex justify-center items-center p-4">
                            <Space.Compact>
                              <Button
                                type="primary"
                                className=" bg-black"
                                size="large"
                                onClick={() =>
                                  handleQuantityChange(i, e.quantity - 1)
                                }
                                disabled={e.quantity === 1}
                              >
                                <i className="fa-solid fa-minus"></i>
                              </Button>
                              <Input
                                readOnly
                                value={e.quantity}
                                size="large"
                                className="text-center"
                                style={{ width: "50px" }}
                              />
                              <Button
                                type="primary"
                                className=" bg-black"
                                size="large"
                                onClick={() =>
                                  handleQuantityChange(i, e.quantity + 1)
                                }
                              >
                                <i className="fa-solid fa-plus"></i>
                              </Button>
                            </Space.Compact>
                          </div>
                          <div className="flex justify-center items-center p-4">
                            <span>
                              {numeral(e.price * e.quantity).format("0, ")}
                            </span>
                          </div>
                          <div className="flex justify-center items-center p-4">
                            <Button
                              type="primary"
                              className="bg-black"
                              onClick={() => handleRemoveItem(i)}
                            >
                              <i className="fa-solid fa-xmark"></i>
                            </Button>
                          </div>
                        </div>
                        <hr />
                      </div>
                    );
                  }
                })}
                <div>
                  <p className="font-bold text-xl mt-4">
                    Tổng tiền: {numeral(getTotalPrice).format("0, ")} VNĐ
                  </p>
                </div>
                <Form onFinish={handleSubmit(handlePlaceOrder)}>
                  <Form.Item>
                    <Controller
                      name="address"
                      control={control}
                      render={({ field }) => <Input {...field} />}
                    />
                    <p className=" text-red-600 mt-1">
                      {errors.address?.message}
                    </p>{" "}
                  </Form.Item>
                  <Button type="primary" className="bg-black" htmlType="submit">
                    Đặt hàng
                  </Button>
                </Form>
              </>
            ) : (
              <>Không có sản phẩm</>
            )}
          </div>
        </div>
      </main>
      <FooterComp />
    </>
  );
};
export default CartPage;
