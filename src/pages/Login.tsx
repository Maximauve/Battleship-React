import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "src/components/Button";
import Input from "src/components/Input";
import { ErrorContext } from "src/contexts/error/ErrorProvider";
import useTranslations from "src/hooks/useTranslation";
import useUser from "src/hooks/useUser";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  const { state } = useLocation();
  const { setError } = useContext(ErrorContext);
  const i18n = useTranslations();
  const { logIn } = useUser();

  const handleLogin = () => {
    logIn({ email, password }).then(() => {
      setError(null);
      navigate(state?.from || '/');
    }).catch((err) => {
      setError(
        <>
          <p>{err.message}</p>
        </>
      );
    });
  }

  const redirectToRegister = () => {
    navigate('/register');
    return;
  }

  return (
    <div className="log-container">
      <h1>{i18n.t('login.h1')}</h1>
      <Input type="text" value={email} onChange={(event) => setEmail(event.target.value)} text={i18n.t('login.placeholder.email')} />
      <Input type="password" value={password} onChange={(event) => setPassword(event.target.value)} text={i18n.t('login.placeholder.password')} />
      <Button text={i18n.t('login.submit')} onClick={handleLogin} />
      <Button text={i18n.t('login.to.register')} onClick={redirectToRegister} />
    </div>
  );
}

export default Login;