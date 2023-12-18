import { useState } from "react";

const LoginModal: React.FC = () => {
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	return (
		<>
			<input type="text" value={username} onChange={(event) => setUsername(event.target.value)}/>
			<input type="password" value={password} onChange={(event) => setPassword(event.target.value)}/>
			<button>Login</button>
		</>
	);
}

export default LoginModal;