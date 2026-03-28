import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoutes() {
  const auth = localStorage.getItem("auth"); // or your auth state

  return auth ? <Outlet /> : <Navigate to="/login" />;
}

export function PublicRoutes(){
    const auth = localStorage.getItem("auth");

    return auth ? <Navigate to="/" /> : <Outlet />;
}





