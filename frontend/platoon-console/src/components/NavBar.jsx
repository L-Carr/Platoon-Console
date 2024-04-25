import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from 'reactstrap';
import logo from '/src/assets/platoon-console-v2.svg'

const NavBar = ({ isLoggedIn, setIsLoggedIn }) => {

const [collapsed, setCollapsed] = useState(true);
const [isOpen, setIsOpen] = useState(false);
const navigate = useNavigate()


const handleLogout = () => {
  //delete token and update auth status
  localStorage.removeItem('token')
  setIsLoggedIn(false)
  navigate('/login')
}


const toggleNavbar = () => {
  setCollapsed(!collapsed)
  setIsOpen(!isOpen)
}


  return (
    <>
      <Navbar className='navbar-expand-sm navbar-dark' >
      <NavbarBrand href="/">
        <img alt="logo" src={logo} style={{ height: 40, width: 40 }} />
      </NavbarBrand>
      <NavbarToggler onClick={toggleNavbar} className="mr-2" />
      <Collapse isOpen={isOpen} navbar>
      <Nav className={!collapsed ? 'flex-column custom-navbar': ""}>
        {isLoggedIn ? (
          <>
            <NavItem>
              <NavLink active href="/" className='custom-link' >Home</NavLink>
            </NavItem>  
            <NavItem>
              <NavLink active href="/login" className='custom-link'  onClick={() => { handleLogout(); toggleNavbar(); }}>Logout</NavLink>
            </NavItem>  
            <NavItem>
              <NavLink active href="https://github.com/CodePlatoon" className='custom-link' >Github</NavLink>
            </NavItem>  
          </>
        ) : (
          <>
            <NavItem>
              <NavLink active href="/register" className='custom-link'>Register</NavLink>
            </NavItem>  
            <NavItem>
              <NavLink active href="/login" className='custom-link'>Login</NavLink>
            </NavItem>
          </>
        )}
        </Nav>
        </Collapse>
      </Navbar>
    </>
  )
}

export default NavBar
