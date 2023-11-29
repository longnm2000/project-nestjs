import { Route, Routes, useNavigate } from "react-router-dom";
import NotFoundPage from "./pages/NotFound/NotFoundPage";
import LoginPage from "./pages/user/login/LoginPage";
import RegisterPage from "./pages/user/register/RegisterPage";
import HomePage from "./pages/user/home/HomePage";
import DetailPage from "./pages/user/detail/DetailPage";
import CartPage from "./pages/user/cart/CartPage";
import AdminLoginPage from "./pages/admin/login/AdminLoginPage";
import { useEffect } from "react";
import UsersManagerPage from "./pages/admin/UserManager/UserManagerPage";
import CategoryManagerPage from "./pages/admin/CategoryManager/CategoryManager";
import UpdateCategoryPage from "./pages/admin/UpdateCategory/UpdateCategoryPage";
import OrdersManagerPage from "./pages/admin/OrderManager/OrderManagerPage";
import OrderHistoryPage from "./pages/user/OrderHistory/OrderHistoryPage";
import ProductManagerPage from "./pages/admin/ProductManager/ProductManager";
import AddProductPage from "./pages/admin/AddProduct/AddProductPage";
import PrivateAdminRoutes from "./components/PrivateAdminRoutes/PrivateAdminRoutes";

function App() {
  const navigate = useNavigate();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  useEffect(() => {
    scrollToTop();
  }, [navigate]);
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/history" element={<OrderHistoryPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route element={<PrivateAdminRoutes />}>
          <Route path="/admin/users" element={<UsersManagerPage />} />
          <Route path="/admin/categories" element={<CategoryManagerPage />} />
          <Route
            path="/admin/categories/:id/update"
            element={<UpdateCategoryPage />}
          />
          <Route path="/admin/orders" element={<OrdersManagerPage />} />
          <Route path="/admin/products" element={<ProductManagerPage />} />
          <Route path="/admin/products/add" element={<AddProductPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
