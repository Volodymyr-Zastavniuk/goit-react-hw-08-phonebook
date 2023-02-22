// import { addContact } from 'redux/Contacts/contacts.operations';
// import './ContactForm.css';
import { useDispatch, useSelector } from 'react-redux';
import { getContactsError } from 'redux/selectors';
import { useState } from 'react';
import { authRegisterThunk } from 'redux/auth/auth.operations';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

const loginFormInitialState = {
  name: '',
  email: '',
  password: '',
};

export default function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const error = useSelector(getContactsError);
  const [values, setValues] = useState(loginFormInitialState);

  const handleChange = event => {
    const { value, name } = event.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    dispatch(authRegisterThunk(values));
    navigate('/', { replace: true });
    // await dispatch(authLoginThunk({ email: values.email, password: values.password })).unwrap();
    resetForm();
  };

  const resetForm = () => {
    setValues(loginFormInitialState);
  };

  return (
    <>
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <form onSubmit={handleFormSubmit} className="contact__form">
        <h2>Please Sign In</h2>
        <label className="contact__label">
          Name
          <input
            type="name"
            name="name"
            required
            value={values.name}
            onChange={handleChange}
            className="contact__input"
          />
        </label>

        <label className="contact__label">
          E-mail
          <input
            type="email"
            name="email"
            required
            value={values.email}
            onChange={handleChange}
            className="contact__input"
          />
        </label>

        <label className="contact__label">
          Password
          <input
            type="password"
            name="password"
            required
            value={values.password}
            onChange={handleChange}
            className="contact__input"
          />
        </label>

        <button type="submit" className="contact__btn" disabled={error}>
          Sign In
        </button>
      </form>
    </>
  );
}
