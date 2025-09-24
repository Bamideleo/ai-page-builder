import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";


interface PrivateRouteProps {
  children: any;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  return isAuthenticated() ? children : <Navigate to="/" replace />;
}