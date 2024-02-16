import { Outlet, useLocation, useNavigate } from "react-router-dom";
import TopNavbar from "./components/TopNavbar/TopNavbar";
import SideNavbar from "./components/SideNavbar/SideNavbar";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
const Layout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (pathname === "/") {
      return navigate("/login");
    }
  }, []);
  const routes = ["/risk", "/assessment", "/reports", "/scenarios"];
  return (
    <>
      {routes.includes(pathname) && (
        <>
          <TopNavbar />
          <SideNavbar />
        </>
      )}
      <Outlet />
      <Toaster />
    </>
  );
};

export default Layout;
