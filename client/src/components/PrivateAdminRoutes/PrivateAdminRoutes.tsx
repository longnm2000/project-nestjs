import { Navigate, Outlet } from "react-router-dom";

function PrivateAdminRoutes() {
  const isAdmin = localStorage.getItem("admin");
  return isAdmin ? <Outlet /> : <Navigate to={"/admin/login"} />;
}

export default PrivateAdminRoutes;
