import { Button, Form, Input } from "antd";
import FooterComp from "../../../components/footer/FooterComp";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios, { AxiosResponse } from "axios";
import Swal, { SweetAlertOptions } from "sweetalert2";
import HeaderComp from "../../../components/header/HeaderComp";
import { Helmet } from "react-helmet";

interface Account {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email không được để trống")
    .matches(/^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/, "Email không hợp lệ")
    .max(100, "Email không dài quá 100 ký tự"),
  password: yup
    .string()
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .max(50, "Mật khẩu không quá 50 ký tự")
    .required("Vui lòng nhập mật khẩu"),
});

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const apiURL = import.meta.env.VITE_API_URL;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: Account) => {
    try {
      const res: AxiosResponse = await axios.post(`${apiURL}/auth/login`, data);
      switch (res.data?.status) {
        case 200:
          await Swal.fire({
            title: "Đăng nhập thành công",
            icon: "success",
            timer: 3000,
          });
          localStorage.setItem("access_token", res.data.access_token);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          navigate("/");
          break;
        case 401:
          Swal.fire({
            title: "Mật khẩu không chính xác",
            icon: "error",
            timer: 3000,
          });
          break;
        case 403:
          Swal.fire({
            title: "Tài khoản đã bị khoá",
            icon: "error",
            timer: 3000,
          });
          break;
        case 404:
          Swal.fire({
            title: "Email không tồn tại",
            icon: "error",
            timer: 3000,
          });
          break;
      }
    } catch (error) {
      Swal.fire({
        title: error,
        icon: "error",
      } as SweetAlertOptions);
    }
  };

  return (
    <>
      <Helmet>
        <title>Đăng nhập</title>
      </Helmet>
      <HeaderComp />
      <main className="bg-no-repeat bg-center bg-cover bg-[url('https://marshallvietnam.vn/wp-content/uploads/2022/10/marshal-banner.jpeg')] sm:py-5">
        <div className="container mx-auto mt-28">
          <Form
            layout="vertical"
            className="sm:rounded-md max-w-xl p-10  bg-white"
            onFinish={handleSubmit(onSubmit)}
          >
            <h1 className="text-center font-bold text-2xl">ĐĂNG NHẬP</h1>
            <Form.Item label="Email">
              <Controller
                name="email"
                control={control}
                render={({ field }) => <Input {...field} />}
              />
              <p className=" text-red-600 mt-1">{errors.email?.message}</p>{" "}
              {/* Hiển thị lỗi nếu có */}
            </Form.Item>
            <Form.Item label="Mật khẩu">
              <Controller
                name="password"
                control={control}
                render={({ field }) => <Input.Password {...field} />}
              />
              <p className=" text-red-600 mt-1">{errors.password?.message}</p>{" "}
              {/* Hiển thị lỗi nếu có */}
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-black w-full"
            >
              Đăng Nhập
            </Button>
            <div>
              <Link to={"/register"}>Không có tài khoản? Đăng ký</Link>
            </div>
          </Form>
        </div>
      </main>
      <FooterComp />
    </>
  );
};
export default LoginPage;
