'use client'
import { useState } from 'react';
import styles from './HamburgerMenu.module.css';

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className={styles.container}>
      {/* Hamburger icon */}
      <div
        className={styles.hamburger}
        onClick={toggleMenu}
        role="button"
        tabIndex={0}
        aria-label="Toggle menu"
        onKeyDown={e => { if (e.key === 'Enter') toggleMenu(); }}
      >
        <div className={isOpen ? styles.barOpen : styles.bar}></div>
        <div className={isOpen ? styles.barOpen : styles.bar}></div>
        <div className={isOpen ? styles.barOpen : styles.bar}></div>
      </div>

      {/* Sidebar navigation */}
      <nav className={`${styles.menu} ${isOpen ? styles.menuOpen : ''}`} aria-hidden={!isOpen}>
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
    </div>
  );
};

export default HamburgerMenu;
