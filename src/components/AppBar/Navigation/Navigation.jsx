import { NavLink } from 'react-router-dom';
import './Navigation.css';
import { useSelector } from 'react-redux';
import { getIsLoggedIn } from 'redux/selectors';

export default function Navigation() {
  const isLoggedIn = useSelector(getIsLoggedIn);
  return (
    <nav className="Nav">
      <ul className="Nav__list">
        <li className="Nav__list-item">
          <NavLink to="" className="Nav__list-link">
            Home
          </NavLink>
        </li>
        {isLoggedIn ? (
          <li>
            <NavLink to="contacts" className="Nav__list-link">
              Contacts
            </NavLink>
          </li>
        ) : (
          <>
            <li>
              <NavLink to="register" className="Nav__list-link">
                Register
              </NavLink>
            </li>
            <li>
              <NavLink to="login" className="Nav__list-link">
                Login
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
