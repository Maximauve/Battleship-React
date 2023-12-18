import React, { PropsWithChildren, useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { UserContext } from 'src/contexts/user/UserProvider';

const ProtectedRoute: React.FC<PropsWithChildren> = ({ children }) => {

	const [{ user }] = useContext(UserContext);
	const location = useLocation();

	console.log(location);

	if (!user) {
		return <Navigate to="/login" state={{ from: location.pathname }} />;
	}

	if (children) {
		return (
			<>
				{children}
			</>
		)
	}
	
	return (
		<>
			<Outlet />
		</>
	)
}

export default ProtectedRoute;