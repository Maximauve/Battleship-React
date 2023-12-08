import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ErrorContext } from "src/contexts/error/ErrorProvider";
import useUser from "src/hooks/user/useUser";

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const nagivate = useNavigate();
  const { setError } = useContext(ErrorContext);
  const { signUp } = useUser();
  const { state } = useLocation();

  const handleRegister = () => {
    console.log('Register');
    signUp({ username, email, password }).then(() => {
      console.log('Register response');
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
    <>
      <h1>Register</h1>
      <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} placeholder="Username" />
      <input type="text" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" />
      <input type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Confirm Password" />
      <button onClick={handleRegister}>Register</button>
    </>
  );
}

export default Register;