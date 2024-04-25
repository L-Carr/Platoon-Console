import React from 'react';
import lostImage from '../../public/lost.png';

const ErrorPage = () => {
  const containerStyles = {
    position: 'relative',
    textAlign: 'center',
    color: 'white'
  };

  const imageStyles = {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  };

  const overlayTextStyles = {
    position: 'absolute',
    top: '35%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '50px',
    letterSpacing: '1px',
    textShadow: '2px 2px 4px #000000'
  };

  const shadowStyles = {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)' // Adding a dark semi-transparent overlay
  };

  return (
    <div style={containerStyles}>
      <h1>Error 404</h1>
      <p>Are you lost?</p>
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <img src={lostImage} alt="Lost" style={imageStyles} />
        <div style={shadowStyles}></div>
        <div style={overlayTextStyles}>404_ YOU'RE BEYOND THE BORDERS.</div>
      </div>
    </div>
  );
}

export default ErrorPage;
