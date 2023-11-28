import { Button, Form, Input } from "antd";
import FooterComp from "../../../components/footer/FooterComp";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios, { AxiosResponse } from "axios";
import Swal, { SweetAlertOptions } from "sweetalert2";

interface RegisterInfo {
  name: string;
  email: string;
  password: string;
  phone: string;
}

const schema = yup.object().shape({
  name: yup.string().required("Họ tên không để trống"),
  email: yup
    .string()
    .required("Email không được để trống")
    .matches(/^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/, "Email không hợp lệ")
    .max(100, "Email không dài quá 100 ký tự"),
  password: yup
    .string()
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .max(50, "Mật khẩu không quá 50 ký tự")
    .required("Mật khẩu không để trống"),
  phone: yup
    .string()
    .matches(/^\d{10}$/, "Số điện thoại phải có 10 chữ số")
    .required("Vui lòng nhập số điện thoại"),
});

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const apiURL = import.meta.env.VITE_API_URL;

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: RegisterInfo) => {
    const res: AxiosResponse = await axios.post(
      `${apiURL}/auth/register`,
      data
    );

    switch (res.data?.status) {
      case 201:
        await Swal.fire({
          icon: "success",
          title: "Đăng ký thành công!",
          text: "Tự động chuyển về trang đăng nhập",
          timer: 2000,
        } as SweetAlertOptions);
        navigate("/login");
        break;
      case 409:
        Swal.fire({
          icon: "error",
          title: "Email đã được sử dụng!",
          timer: 2000,
        } as SweetAlertOptions);
        break;
    }
  };
  return (
    <>
      <main className="bg-gradient-to-r from-purple-500 to-pink-500 sm:py-5">
        <div className="container mx-auto">
          <Form
            layout="vertical"
            className="sm:rounded-md max-w-lg p-10 mx-auto bg-white"
            onFinish={handleSubmit(onSubmit)}
          >
            <h1 className="text-center font-bold text-2xl">ĐĂNG KÝ</h1>

            <Form.Item label="Họ tên">
              <Controller
                name="name"
                control={control}
                render={({ field }) => <Input {...field} />}
              />
              <p className=" text-red-600 mt-1">{errors.name?.message}</p>{" "}
            </Form.Item>
            <Form.Item label="Email">
              <Controller
                name="email"
                control={control}
                render={({ field }) => <Input {...field} />}
              />
              <p className=" text-red-600 mt-1">{errors.email?.message}</p>{" "}
            </Form.Item>
            <Form.Item label="Mật khẩu">
              <Controller
                name="password"
                control={control}
                render={({ field }) => <Input.Password {...field} />}
              />
              <p className=" text-red-600 mt-1">{errors.password?.message}</p>{" "}
            </Form.Item>
            <Form.Item label="Số điện thoại">
              <Controller
                name="phone"
                control={control}
                render={({ field }) => <Input {...field} />}
              />
              <p className=" text-red-600 mt-1">{errors.phone?.message}</p>{" "}
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="bg-black w-full"
              >
                Đăng ký
              </Button>
            </Form.Item>
            <Link to={"/login"} className="text-base">
              Đã có tài khoản? Đăng nhập
            </Link>
          </Form>
        </div>
      </main>
      <FooterComp />
    </>
  );
};
export default RegisterPage;
