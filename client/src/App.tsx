import { Route, Routes } from "react-router-dom";
import NotFoundPage from "./pages/NotFound/NotFoundPage";
import LoginPage from "./pages/user/login/LoginPage";
import RegisterPage from "./pages/user/register/RegisterPage";
import HomePage from "./pages/user/home/HomePage";
import DetailPage from "./pages/user/detail/DetailPage";
import CartPage from "./pages/user/cart/CartPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
