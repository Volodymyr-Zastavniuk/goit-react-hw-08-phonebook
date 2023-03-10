import { useDispatch, useSelector } from 'react-redux';
import { getAuthError, getIsRefreshing } from 'redux/selectors';
import { useState } from 'react';
import { authLoginThunk } from 'redux/auth/auth.operations';
import { Helmet } from 'react-helmet';
import './LoginPage.css';

const loginFormInitialState = {
  email: '',
  password: '',
};

export default function LoginPage() {
  const dispatch = useDispatch();
  const authError = useSelector(getAuthError);
  const isRefreshing = useSelector(getIsRefreshing);
  const [values, setValues] = useState(loginFormInitialState);

  const handleChange = event => {
    const { value, name } = event.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };
  const handleFormSubmit = async event => {
    event.preventDefault();
    try {
      dispatch(authLoginThunk(values));
    } catch (error) {
      console.log(error);
    } finally {
      resetForm();
    }
  };

  const resetForm = () => {
    setValues(loginFormInitialState);
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <form onSubmit={handleFormSubmit} className="login__form">
        <h2>Please login</h2>
        <label className="login__label">
          E-mail
          <input
            type="email"
            name="email"
            required
            value={values.email}
            onChange={handleChange}
            className="login__input"
          />
        </label>

        <label className="login__label">
          Password
          <input
            type="password"
            name="password"
            required
            value={values.password}
            onChange={handleChange}
            className="login__input"
          />
        </label>

        <button type="submit" className="login__btn" disabled={isRefreshing}>
          Login
        </button>

        {authError === 'login' && (
          <p>Please try again with other credentials.</p>
        )}
      </form>
    </>
  );
}
