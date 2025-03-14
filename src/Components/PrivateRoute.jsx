import { Navigate } from "react-router-dom";
import { useAuth } from "../../Context/UserContext";

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  if (!auth) return <p>Loading...</p>; 
  return auth.token ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
