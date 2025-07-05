import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFoundPage from './Pages/NotFoundPage';
import HomePage from './Pages/HomePage';

const isMobileOrTablet = () => {
  // Check for touch device or small screen
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  const isTouch =
    /android|avantgo|blackberry|iemobile|ipad|iphone|ipod|opera mini|palm|phone|tablet|windows phone|xda|xiino/i.test(
      userAgent
    );
  const isSmallScreen = window.innerWidth < 1024; // adjust as needed
  return isTouch || isSmallScreen;
};

const App = () => {
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    setBlocked(isMobileOrTablet());
    // Optionally, listen for resize
    const handleResize = () => setBlocked(isMobileOrTablet());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (blocked) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          fontSize: '1.5rem',
          textAlign: 'center',
          background: '#f8f8f8',
        }}
      >
        <p>
          Sorry, this website is only available on desktop or laptop devices.
        </p>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<HomePage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
