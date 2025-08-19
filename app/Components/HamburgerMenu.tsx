'use client';

import { useState } from 'react';
import styles from './HamburgerMenu.module.css';

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Hamburger / Cross icon */}
      <div
        className={`${styles.hamburger} ${isOpen ? styles.hamburgerOpen : ''}`}
        onClick={toggleMenu}
        role="button"
        tabIndex={0}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        onKeyDown={e => {
          if (e.key === 'Enter') toggleMenu();
        }}
      >
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
      </div>

      {/* Sidebar */}
      <nav
        className={`${styles.menu} ${isOpen ? styles.menuOpen : ''}`}
        aria-hidden={!isOpen}
      >
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/tests">Tests</a></li>
          <li><a href="/prisma">Prisma/Sequeelize</a></li>
          <li><a href="/docker">Docker</a></li>
        </ul>
      </nav>

      {/* Overlay */}
      {isOpen && <div className={styles.overlay} onClick={toggleMenu} />}
    </>
  );
};

export default HamburgerMenu;
