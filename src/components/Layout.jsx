import { useEffect, useState } from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import Loader from './Loader';
import Cursor from './Cursor';

const Layout = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="app-container">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Navigation />
          <main className="main-content">
            {children}
          </main>
          <Footer />
          <Cursor />
        </>
      )}
    </div>
  );
};

export default Layout;