import { Navigate } from "react-router-dom";
import { useLogout } from "../../hooks/useAuth";

export default function Logout() {
   const logout = useLogout();
   console.log("FE logout JSX");
   logout();
   return <Navigate to="/sign-in" />
}