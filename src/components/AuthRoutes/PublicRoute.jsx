import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { getToken } from 'redux/selectors';

export const PublicRoute = () => {
  const token = useSelector(getToken);

  return token ? <Navigate to="/" replace /> : <Outlet />;
};
//  return token ? <Navigate to={location?.state?.from ?? '/'} replace /> : <Outlet />;
