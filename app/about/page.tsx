// app/about/page.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { getCookie, setCookie } from '../utlis/Cookies'; 

export default function About() {
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Helper to check if cookies are accepted
  const isConsentGiven = () => getCookie('cookieConsent') === 'accepted';

  // Load font size, dark mode, and video time from cookies only if consent is given
  useEffect(() => {
    if (!isConsentGiven()) return;

    const savedFontSize = getCookie('fontSize');
    const savedDarkMode = getCookie('darkMode');
    const savedVideoTime = getCookie('videoProgress');

    if (savedFontSize) setFontSize(parseInt(savedFontSize, 10));
    if (savedDarkMode) setDarkMode(savedDarkMode === 'true');

    if (videoRef.current && savedVideoTime && !isNaN(Number(savedVideoTime))) {
      videoRef.current.currentTime = Number(savedVideoTime);
    }
  }, []);

  // Save font size to cookie if consent is given
  useEffect(() => {
    if (!isConsentGiven()) return;
    setCookie('fontSize', fontSize.toString(), 30);
  }, [fontSize]);

  // Save dark mode to cookie and apply class if consent is given
  useEffect(() => {
    if (isConsentGiven()) {
      setCookie('darkMode', darkMode.toString(), 30);
    }
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  // Save video time to cookie periodically if consent is given
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const saveProgress = () => {
      if (isConsentGiven()) {
        setCookie('videoProgress', video.currentTime.toString(), 30);
      }
    };

    video.addEventListener('timeupdate', saveProgress);
    return () => {
      video.removeEventListener('timeupdate', saveProgress);
    };
  }, []);

  const increaseFontSize = () => setFontSize(prev => Math.min(prev + 2, 24));
  const decreaseFontSize = () => setFontSize(prev => Math.max(prev - 2, 12));

  return (
    <div className="d-flex flex-column min-vh-100" style={{ fontSize: `${fontSize}px` }}>
      <Header
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode(prev => !prev)}
        increaseFontSize={increaseFontSize}
        decreaseFontSize={decreaseFontSize}
      />

      <main className="container my-4 flex-grow-1">
        <h1 className="mb-4">About This Project</h1>

        <p><strong>Name:</strong> Shishir Poudel</p>
        <p><strong>Student Number:</strong> 22239026</p>

        <section className="mt-4">
          <h2>How to Use This Website</h2>
          <p>
            The video below demonstrates how to fill in the form and execute Git commands via this web interface.
          </p>

          <video ref={videoRef} width="100%" height="auto" controls>
            <source src="/video/demo.mp4" type="video/mp4" />
            Your browser does not support the video tag. You can <a href="/video/demo.mp4">download the video here</a>.
          </video>
        </section>
      </main>

      <Footer />
    </div>
  );
}
