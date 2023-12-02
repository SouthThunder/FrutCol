import { Outlet, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoutes = () => {
  const token = Cookies.get("token");
  console.log('test')
  console.log(token)
  return token ? <Outlet /> : <Navigate to="/ingreso" />;
};

export default PrivateRoutes;