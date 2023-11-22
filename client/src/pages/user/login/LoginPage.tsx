import { Button, Form, Input } from "antd";
import FooterComp from "../../../components/footer/FooterComp";
import { Link } from "react-router-dom";
const LoginPage: React.FC = () => {
  return (
    <>
      <main className="bg-no-repeat bg-center bg-cover bg-[url('https://marshallvietnam.vn/wp-content/uploads/2022/10/marshal-banner.jpeg')] sm:py-5">
        <div className="container mx-auto">
          <Form
            layout="vertical"
            className="sm:rounded-md max-w-xl p-10  bg-white"
          >
            <h1 className="text-center font-bold text-2xl">ĐĂNG NHẬP</h1>
            <Form.Item label="Email" name="email" required>
              <Input />
            </Form.Item>
            <Form.Item label="Password" name="password" required>
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="bg-black w-full"
              >
                Đăng Nhập
              </Button>
            </Form.Item>
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
