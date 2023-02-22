import './Layout.css';

import AppBar from 'components/AppBar/AppBar';

export default function Layout({ children }) {
  return (
    <>
      <AppBar />
      <main className="container">
        <>{children}</>
      </main>
    </>
  );
}
