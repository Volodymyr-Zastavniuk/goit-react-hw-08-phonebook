import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { authRefreshUserThunk } from 'redux/auth/auth.operations';
import { getToken } from 'redux/selectors';
import { PublicRoute } from './AuthRoutes/PublicRoute';
import { PrivatRoute } from './AuthRoutes/PrivatRoute';
import Layout from './Layout/Layout';

const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const ContactsPage = lazy(() => import('../pages/ContactsPage/ContactsPage'));
const LoginPage = lazy(() => import('../pages/LoginPage/LoginPage'));
const RegisterPage = lazy(() => import('../pages/Register/Register'));

export default function App() {
  const dispatch = useDispatch();
  const token = useSelector(getToken);

  useEffect(() => {
    dispatch(authRefreshUserThunk());
  }, [token, dispatch]);

  return (
    <>
      <BrowserRouter basename="goit-react-hw-08-phonebook">
        <Layout>
          <Suspense fallback={null}>
            <Routes>
              <Route path="" element={<HomePage />} />
              <Route path="" element={<PrivatRoute />}>
                <Route path="/contacts" element={<ContactsPage />} />
              </Route>
              <Route path="" element={<PublicRoute />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
              </Route>
            </Routes>
          </Suspense>
        </Layout>
      </BrowserRouter>
    </>
  );
}
