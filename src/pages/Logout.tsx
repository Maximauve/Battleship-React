import { useEffect } from "react";
import {useLocation, useNavigate} from "react-router-dom";
import useUser from "src/hooks/useUser";

const Logout = () => {
  const { logOut } = useUser();
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    localStorage.removeItem('user');
    logOut();
    navigate(state?.from || '/');
  }, [logOut, navigate, state]);

  return (
    <div>
      <h1>Logout</h1>
    </div>
  );
}

export default Logout;