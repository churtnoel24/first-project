import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoutes() {
  const auth = localStorage.getItem("username"); // or your auth state

  return auth ? <Outlet /> : <Navigate to="/login" />;
}

export function PublicRoutes(){
    const auth = localStorage.getItem("username");

    return auth ? <Navigate to="/" /> : <Outlet />;
}





