import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getIsRefreshing, getUserName } from 'redux/selectors';
import { getIsLoggedIn } from 'redux/selectors';

export default function HomePage() {
  const isLoggedIn = useSelector(getIsLoggedIn);
  const isRefreshing = useSelector(getIsRefreshing);
  const userName = useSelector(getUserName);

  return (
    <>
      <Helmet>
        <title>Phonebook</title>
      </Helmet>
      {isLoggedIn && !isRefreshing && (
        <>
          <h2>Hello {userName}</h2>
          <p>
            Start managing your contacts at{' '}
            <Link to="/contacts">contacts page</Link>.
          </p>
        </>
      )}

      {!isLoggedIn && !isRefreshing && (
        <>
          <h2>Your personal phonebook</h2>
          <p>
            Please <Link to="/login">login</Link> or{' '}
            <Link to="/login">register</Link> to start using this app.
          </p>
        </>
      )}
    </>
  );
}
