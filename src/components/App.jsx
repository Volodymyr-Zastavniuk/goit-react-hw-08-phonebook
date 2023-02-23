import { Suspense, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HomePage from '../pages/HomePage/HomePage';
import ContactsPage from '../pages/ContactsPage/ContactsPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import RegisterPage from '../pages/Register/Register';
import Layout from './Layout/Layout';
import { authRefreshUserThunk } from 'redux/auth/auth.operations';
import { useDispatch, useSelector } from 'react-redux';
import { getToken } from 'redux/selectors';
import { PublicRoute } from './AuthRoutes/PublicRoute';
import { PrivatRoute } from './AuthRoutes/PrivatRoute';

export default function App() {
  const dispatch = useDispatch();
  const token = useSelector(getToken);
  // const isRefreshing = useSelector(getIsRefreshing);

  useEffect(() => {
    dispatch(authRefreshUserThunk());
  }, [token, dispatch]);

  return (
    <>
      <BrowserRouter basename="goit-react-hw-08-phonebook">
        <Layout>
          <Suspense fallback={<p>Loading...</p>}>
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
