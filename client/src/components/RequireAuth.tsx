import { Outlet, useLocation, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const RequireAuth = () => {
  const { id } = useAuth();
  const location = useLocation();

  return id ? (
    <Outlet />
  ) : (
    <Navigate to='/sign_in' state={{ from: location }} />
  );
};
export default RequireAuth;
