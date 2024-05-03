import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for auth with token in local storage
    const isAuthenticated = localStorage.getItem('token') !== null;
    setIsLoggedIn(isAuthenticated);

    // Redirect to /login if not logged in
    if (
      !isAuthenticated &&
      !/^\/(login|forgot-password|change-password|register\/?)/.test(location.pathname)
    ) {
      navigate('/login');
    }
  }, [navigate, location.pathname]); 

  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} />
      <div className="mainContent" style={{paddingTop: "8rem"}}>
        <Outlet />
      </div>
    </>
  );
}

export default App;
