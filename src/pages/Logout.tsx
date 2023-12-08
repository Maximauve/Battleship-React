import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "src/hooks/useUser";

const Logout = () => {
  const { logOut } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('user');
    logOut();
    navigate('/');
  }, [logOut, navigate]);

  return (
    <div>
      <h1>Logout</h1>
    </div>
  );
}

export default Logout;