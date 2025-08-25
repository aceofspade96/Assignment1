'use client';

import { useState, useEffect } from 'react';
import { setCookie, getCookie } from '../utlis/Cookies';
import styles from './HamburgerMenu.module.css';
import { usePathname } from 'next/navigation';

const HamburgerMenu = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('');

  useEffect(() => {
    const savedTab = getCookie('activeMenuTab');

    if (savedTab) {
      setActiveTab(savedTab);
    } else {
      const pathToTabMap: Record<string, string> = {
        '/': 'Home',
        '/about': 'About',
        '/tests': 'Tests',
        '/prisma': 'Prisma/Sequeelize',
        '/docker': 'Docker',
      };
      setActiveTab(pathToTabMap[pathname] || 'Home');
    }
  }, [pathname]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleMenuClick = (tabName: string) => {
    setActiveTab(tabName);
    setCookie('activeMenuTab', tabName, 30);
    setIsOpen(false);
  };

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

      {/* Sidebar menu */}
      <nav
        className={`${styles.menu} ${isOpen ? styles.menuOpen : ''}`}
        aria-hidden={!isOpen}
      >
        <ul>
          <li>
            <a
              href="/"
              className={activeTab === 'Home' ? styles.active : ''}
              onClick={() => handleMenuClick('Home')}
              tabIndex={isOpen ? 0 : -1}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/about"
              className={activeTab === 'About' ? styles.active : ''}
              onClick={() => handleMenuClick('About')}
              tabIndex={isOpen ? 0 : -1}
            >
              About
            </a>
          </li>
          <li>
            <a
              href="/tests"
              className={activeTab === 'Tests' ? styles.active : ''}
              onClick={() => handleMenuClick('Tests')}
              tabIndex={isOpen ? 0 : -1}
            >
              Tests
            </a>
          </li>
          <li>
            <a
              href="/prisma"
              className={activeTab === 'Prisma/Sequeelize' ? styles.active : ''}
              onClick={() => handleMenuClick('Prisma/Sequeelize')}
              tabIndex={isOpen ? 0 : -1}
            >
              Prisma/Sequeelize
            </a>
          </li>
          <li>
            <a
              href="/docker"
              className={activeTab === 'Docker' ? styles.active : ''}
              onClick={() => handleMenuClick('Docker')}
              tabIndex={isOpen ? 0 : -1}
            >
              Docker
            </a>
          </li>
        </ul>
      </nav>

      {/* Overlay */}
      {isOpen && <div className={styles.overlay} onClick={toggleMenu} />}
    </>
  );
};

export default HamburgerMenu;
