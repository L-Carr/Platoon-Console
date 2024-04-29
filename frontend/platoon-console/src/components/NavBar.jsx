import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'
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
import logo from '/src/assets/platoon-console-v3.svg'

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
      <Navbar className='navbar-expand-sm navbar-dark' style={{ position: 'absolute', width: '100%'}}>
      <NavbarBrand href="/">
        <img alt="logo" src={logo} style={{ height: 40, width: 40 }} />
      </NavbarBrand>
      <NavbarToggler onClick={toggleNavbar} className="mr-2" />
      <Collapse isOpen={isOpen} navbar>
      {isLoggedIn ? (
        <>
      <Nav className='me-auto' navbar>
            <NavItem>
              <NavLink active to="/" tag={Link} className='custom-link' >Home</NavLink>
            </NavItem>  
            <NavItem>
              <NavLink active to="/login" tag={Link} className='custom-link'  onClick={() => { handleLogout(); toggleNavbar(); }}>Logout</NavLink>
            </NavItem>  
            <NavItem>
              <NavLink active href="https://github.com/CodePlatoon" className='custom-link' target="_blank" rel="noopener noreferrer">Github</NavLink>
            </NavItem>  
            </Nav>
          </>
        ) : (
          <>
      <Nav className='me-auto' navbar>
            <NavItem>
              <NavLink active tag={Link} to="/register" className='custom-link' onClick={toggleNavbar}>Register</NavLink>
            </NavItem>  
            <NavItem>
              <NavLink active tag={Link} to="/login" className='custom-link' onClick={toggleNavbar}>Login</NavLink>
            </NavItem>
        </Nav>
          </>
        )}
        </Collapse>
      </Navbar>
    </>
  )
}

export default NavBar
