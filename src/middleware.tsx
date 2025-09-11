import { Navigate, Outlet, useLocation } from "react-router-dom";
import type { User } from "@/types";

function Middleware({ context }: { context: User }) {
  const location = useLocation();

  if (location.pathname === "/" || !location.pathname.startsWith("/view")) {
    return <Navigate to="/view/Dashboard" replace />;
  }

  return <Outlet context={context} />;
}

export default Middleware;
