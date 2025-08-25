'use client';

import { useState, useEffect } from 'react';
import { setCookie, getCookie, deleteCookie } from '../utlis/Cookies';
import styles from './CookieConsent.module.css';  // import the CSS module

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
    <div className={styles.cookieConsentBanner}>
      <span>This website uses cookies to improve your experience.</span>
      <button onClick={acceptCookies} className={styles.cookieConsentButton}>
        Accept
      </button>
      <button onClick={rejectCookies} className={styles.cookieConsentButton}>
        Reject
      </button>
    </div>
  );
}
