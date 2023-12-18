import React from 'react';

interface UserProps {
	me?: boolean;
}
const User: React.FC<UserProps> = ({ me }) => {
	console.log(me);

	return (
		<>
			<h1>{me && 'my '}User</h1>
		</>
	)
}

export default User;