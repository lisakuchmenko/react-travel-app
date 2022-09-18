import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ user }) => {
	if (!user) {
		return <Navigate to='sign-in' />;
	}
	return <Outlet />;
};

export default ProtectedRoute;
