import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserName } from 'redux/selectors';
import { getIsLoggedIn } from 'redux/selectors';

export default function HomePage() {
  const isLoggedIn = useSelector(getIsLoggedIn);
  const userName = useSelector(getUserName);

  return (
    <>
      <Helmet>
        <title>Phonebook</title>
      </Helmet>
      {isLoggedIn ? (
        <>
          <h2>Hello {userName}</h2>
          <p>
            Start managing your contacts at{' '}
            <Link to="/contacts">contacts page</Link>.
          </p>
        </>
      ) : (
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
