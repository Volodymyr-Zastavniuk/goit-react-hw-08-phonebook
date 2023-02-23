import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { getToken } from 'redux/selectors';

export const PrivatRoute = () => {
  const token = useSelector(getToken);

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

//  return token ? <Outlet /> : <Navigate to="/login" replace />;
// isLoggedIn(pin):false
