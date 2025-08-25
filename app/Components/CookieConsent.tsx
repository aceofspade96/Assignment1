'use client';

import { useState, useEffect } from 'react';
import { setCookie, getCookie, deleteCookie } from '../utlis/Cookies'; 
export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const consent = getCookie('cookieConsent');
    if (!consent) setShowConsent(true);
  }, []);

  const acceptCookies = () => {
    setCookie('cookieConsent', 'accepted', 30);
    setShowConsent(false);
  };

  const rejectCookies = () => {
    // Remove all cookies you use for tracking preferences
    deleteCookie('cookieConsent');
    deleteCookie('activeMenuTab');
    deleteCookie('darkMode');
    deleteCookie('fontSize');
    deleteCookie('videoProgress');
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        backgroundColor: '#333',
        color: 'white',
        padding: '15px',
        textAlign: 'center',
        zIndex: 1000,
      }}
    >
      <span>This website uses cookies to improve your experience.</span>
      <button onClick={acceptCookies} style={{ marginLeft: '10px', padding: '5px 10px' }}>
        Accept
      </button>
      <button onClick={rejectCookies} style={{ marginLeft: '10px', padding: '5px 10px' }}>
        Reject
      </button>
    </div>
  );
}
