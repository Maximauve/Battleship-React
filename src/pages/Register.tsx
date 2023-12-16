import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "src/components/Button";
import Input from "src/components/Input";
import { ErrorContext } from "src/contexts/error/ErrorProvider";
import useTranslations from "src/hooks/useTranslation";
import useUser from "src/hooks/useUser";

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const nagivate = useNavigate();
  const { setError } = useContext(ErrorContext);
  const { signUp } = useUser();
  const { state } = useLocation();
  const i18n = useTranslations();

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
      <h1>{i18n.t('register.h1')}</h1>
      <Input type="text" value={username} onChange={(event) => setUsername(event.target.value)} text={i18n.t('register.placeholder.username')} />
      <Input type="text" value={email} onChange={(event) => setEmail(event.target.value)} text={i18n.t('register.placeholder.email')} />
      <Input type="password" value={password} onChange={(event) => setPassword(event.target.value)} text={i18n.t('register.placeholder.password')} />
      <Input type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} text={i18n.t('register.placeholder.confirmPassword')} />
      <Button text={i18n.t('register.submit')} onClick={handleRegister} />
    </>
  );
}

export default Register;