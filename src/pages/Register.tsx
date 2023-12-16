import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ErrorContext } from "src/contexts/error/ErrorProvider";
import useTranslations from "src/hooks/useTranslation";
import useUser from "src/hooks/useUser";

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const navigate = useNavigate();
  const { state } = useLocation();
  const { setError } = useContext(ErrorContext);
  const { signUp } = useUser();
  const i18n = useTranslations();

  const handleRegister = () => {
    signUp({ username, email, password }).then(() => {
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

  return (
    <>
      <h1>{i18n.t('register.h1')}</h1>
      <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} placeholder={i18n.t('register.placeholder.username')} />
      <input type="text" value={email} onChange={(event) => setEmail(event.target.value)} placeholder={i18n.t('register.placeholder.email')} />
      <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder={i18n.t('register.placeholder.password')} />
      <input type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder={i18n.t('register.placeholder.confirmPassword')} />
      <button onClick={handleRegister}>{i18n.t('register.submit')}</button>
    </>
  );
}

export default Register;