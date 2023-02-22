import { Suspense, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HomePage from '../pages/HomePage/HomePage';
import ContactsPage from '../pages/ContactsPage/ContactsPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import RegisterPage from '../pages/Register/Register';
import Layout from './Layout/Layout';
import { authRefreshUserThunk } from 'redux/auth/auth.operations';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthError, getToken } from 'redux/selectors';

export default function App() {
  const dispatch = useDispatch();
  const token = useSelector(getToken);
  const isAuthError = useSelector(getAuthError);
  // const isLoading = useSelector(getIsLoading);

  useEffect(() => {
    dispatch(authRefreshUserThunk());
  }, [token, dispatch]);

  return (
    <>
      <BrowserRouter basename="goit-react-hw-08-phonebook">
        <Layout>
          {isAuthError ? (
            <p>Something went wrong, please try again later...</p>
          ) : (
            <Suspense fallback={<p>Loading...</p>}>
              <Routes>
                <Route path="" element={<HomePage />} />
                <Route path="/contacts" element={<ContactsPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
              </Routes>
            </Suspense>
          )}
        </Layout>
      </BrowserRouter>
    </>
  );
}
