import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "src/hooks/useUser";

const Login: React.FC = () => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [error, setError] = useState<string>('');
	const nagivate = useNavigate();

	const { logIn } = useUser();


	const handleLogin = () => {
		console.log('Login');
		logIn({ email, password }).then(() => {
			console.log('Login response');
			nagivate('/');
		}).catch((err) => {
			setError(err.message);
		});
	}

	return (
		<>
			<h1>Login</h1>
			{error && <div>{error}</div>}
			<input type="text" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email" />
			<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" />
			<button onClick={handleLogin}>Login</button>
		</>
	);
}

export default Login;