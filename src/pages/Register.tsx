import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "src/hooks/useUser";

const Register: React.FC = () => {
	const [email, setEmail] = useState<string>('');
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [confirmPassword, setConfirmPassword] = useState<string>('');
	const [error, setError] = useState<string>('');
	const nagivate = useNavigate();
	const { signUp } = useUser();

	const handleRegister = () => {
		console.log('Register');
		signUp({ username, email, password }).then(() => {
			console.log('Register response');
			nagivate('/');
		}).catch((err) => {
			setError(err.message);
		});
	}

	return (
		<>
			<h1>Register</h1>
			{error && <div>{error}</div>}
			<input type="text" value={username} onChange={(event) => setUsername(event.target.value)} placeholder="Username" />
			<input type="text" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email" />
			<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" />
			<input type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Confirm Password" />
			<button onClick={handleRegister}>Register</button>
		</>
	);
}

export default Register;