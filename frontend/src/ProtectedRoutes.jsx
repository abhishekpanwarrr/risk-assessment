import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const auth = Cookies.get("accessToken");

  return auth ? <Outlet /> : <Navigate to={"/login "} />;
};
export default ProtectedRoutes;
