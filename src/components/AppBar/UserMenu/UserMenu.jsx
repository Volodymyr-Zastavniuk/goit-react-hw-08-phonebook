import { authLogoutThunk } from 'redux/auth/auth.operations';
import './UserMenu.css';
import { useDispatch, useSelector } from 'react-redux';
import { getUserEmail } from 'redux/selectors';

export default function UserMenu() {
  const currentUserEmail = useSelector(getUserEmail);
  const dispatch = useDispatch();
  return (
    <div className="UserMenu-wrapper">
      <p>{currentUserEmail}</p>
      <button
        type="button"
        onClick={() => dispatch(authLogoutThunk())}
        className="contact-list__btn"
      >
        Logout
      </button>
    </div>
  );
}
