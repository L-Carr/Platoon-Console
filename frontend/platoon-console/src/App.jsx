import { useState, useEffect } from 'react'
import  { Outlet, useNavigate } from 'react-router-dom'
import NavBar from './components/NavBar'

const useLoggedIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const useLoggedIn = () => {
    useEffect(() => {
      //check for auth with token in local storage
      const isAuthenticated = localStorage.getItem('token') !== null
      setIsLoggedIn(isAuthenticated)
    }, [])
  
    return isLoggedIn
  }
}


function App() {
  const isLoggedIn = useLoggedIn()
  

  return (
    <>
    <NavBar isLoggedIn={isLoggedIn}  />
    <div className="mainContent" style={{paddingTop: "6rem"}}>
    <Outlet />
    </div>
    </>
  )
}

export default App;
