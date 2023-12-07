import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ErrorContext } from "src/contexts/error/ErrorProvider";
import useTranslations from "src/hooks/useTranslation";
import useUser from "src/hooks/useUser";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const nagivate = useNavigate();
  const { state } = useLocation();
  const { setError } = useContext(ErrorContext);
  const i18n = useTranslations();

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
      <h1>{i18n.t('login.h1')}</h1>
      <input type="text" value={email} onChange={(event) => setEmail(event.target.value)} placeholder={i18n.t('login.placeholder.email')} />
      <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder={i18n.t('login.placeholder.password')} />
      <button onClick={handleLogin}>{i18n.t('login.submit')}</button>
    </div>
  );
}

export default Login;