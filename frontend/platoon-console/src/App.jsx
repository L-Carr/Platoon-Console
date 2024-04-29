import { useState, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import NavBar from './components/NavBar'

const useLoggedIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Check for auth with token in local storage
    const isAuthenticated = localStorage.getItem('token') !== null
    setIsLoggedIn(isAuthenticated)
  }, []) // Run once after the initial render

  return isLoggedIn
}

function App() {
  const isLoggedIn = useLoggedIn()
  const navigate = useNavigate()
  
  useEffect(() => {
    // Redirect to /login if not logged in
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      navigate('/');
    }
  }, [isLoggedIn, navigate]) // Re-run whenever isLoggedIn or navigate changes

  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} />
      <div className="mainContent" style={{paddingTop: "8rem"}}>
        <Outlet />
      </div>
    </>
  )
}

export default App;
