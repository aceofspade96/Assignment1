'use client';

import dynamic from 'next/dynamic';

// Dynamically import the actual consent component to avoid hydration mismatches
const CookieConsent = dynamic(() => import('./CookieConsent'), { ssr: false });

export default function CookieConsentWrapper() {
  return <CookieConsent />; 
}