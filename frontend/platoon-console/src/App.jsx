import { useState, useEffect } from 'react'
import  { Outlet, useNavigate } from 'react-router-dom'
import NavBar from './components/NavBar'

function App() {

  return (
    <>
    <NavBar />
    <div className="mainContent" style={{paddingTop: "6rem"}}>
    <Outlet />
    </div>
    </>
  )
}

export default App;
