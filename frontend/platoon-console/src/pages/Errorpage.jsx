import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/NavBar';
import lostImage from '/lost.png';

const ErrorPage = () => {
  // State to manage dynamic padding
  const [topPadding, setTopPadding] = useState('70px');

  useEffect(() => {
    const handleResize = () => {
      // Assume the navbar expands more on small screens
      if (window.innerWidth <= 768) {
        setTopPadding('140px'); // Adjust this value based on your Navbar's expanded height
      } else {
        setTopPadding('70px');
      }
    };

    // Listen to window resize events
    window.addEventListener('resize', handleResize);

    // Initial check
    handleResize();

    // Cleanup function to remove event listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const containerStyles = {
    position: 'relative',
    textAlign: 'center',
    color: 'white',
    minHeight: '100vh',
    overflow: 'hidden',
    paddingTop: topPadding, // Use dynamic padding here
  };

  const navbarStyles = {
    position: 'relative', // Ensure this is not 'static' to make z-index effective
    zIndex: 1050, // Increasing zIndex to make it higher than any other page element
    width: '100%', // Ensures it spans the full width
  };

  const imageStyles = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: -1
  };

  const shadowStyles = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 0
  };

  const contentStyles = {
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  };

  const overlayTextStyles = {
    fontSize: '2rem',
    letterSpacing: '1px',
    textShadow: '2px 2px 4px #000000'
  };

  return (
    <>
    <div style={navbarStyles}>
      <Navbar />
    </div>
      <div style={containerStyles}>
        <img src={lostImage} alt="Lost" style={imageStyles} />
        <div style={shadowStyles}></div>
        <div style={contentStyles}>
          <h2 className="mainH1" style={{ marginTop: "1px" }}>Error 404_</h2>
          <div style={overlayTextStyles}>
            YOU'RE BEYOND THE BORDERS.<br />
            <Link to="/" className="btn btn-secondary mt-3">Go Home</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default ErrorPage;
