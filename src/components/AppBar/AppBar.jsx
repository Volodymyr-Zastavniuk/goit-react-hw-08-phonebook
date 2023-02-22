import UserMenu from './UserMenu/UserMenu';
import Navigation from './Navigation/Navigation';
import './AppBar.css';
import { useSelector } from 'react-redux';
import { getIsLoggedIn } from 'redux/selectors';

export default function AppBar() {
  const isLoggedIn = useSelector(getIsLoggedIn);
  return (
    <header className="AppBar">
      <h1 className="AppBar-title">Phonebook</h1>
      <div className="AppBar-nav-wrapper">
        <Navigation />
        {isLoggedIn && <UserMenu />}
      </div>
    </header>
  );
}
