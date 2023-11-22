import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
import FooterComp from "../../../components/footer/FooterComp";
const RegisterPage: React.FC = () => {
  return (
    <>
      <main className="bg-gradient-to-r from-purple-500 to-pink-500 sm:py-5">
        <div className="container mx-auto">
          <Form
            layout="vertical"
            className="sm:rounded-md max-w-lg p-10 mx-auto bg-white"
          >
            <h1 className="text-center font-bold text-2xl">ĐĂNG KÝ</h1>
            <Form.Item label="Họ tên" name="username" required>
              <Input />
            </Form.Item>

            <Form.Item label="Email" name="email" required>
              <Input />
            </Form.Item>

            <Form.Item label="Password" name="password" required>
              <Input.Password />
            </Form.Item>
            <Form.Item label="Số điện thoại" name="phone" required>
              <Input />
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
