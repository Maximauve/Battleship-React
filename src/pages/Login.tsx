import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ErrorContext } from "src/contexts/error/ErrorProvider";
import useUser from "src/hooks/user/useUser";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  // const [error, setError] = useState<string>('');
  const nagivate = useNavigate();
  const { state } = useLocation();
  const { setError } = useContext(ErrorContext);

  const { logIn } = useUser();


  const handleLogin = () => {
    console.log('Login');
    logIn({ email, password }).then(() => {
      console.log('Login response, redirect : ', state?.from);
      setError(null);
      nagivate(state?.from ? state.from : '/');
    }).catch((err) => {
      setError(
        <>
          <p>{err.message}</p>
        </>
      );
    });
  }

  return (
    <div>
      <h1>Login</h1>
      <input type="text" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;