'use client';

import { usePathname } from 'next/navigation';
import HamburgerMenu from './HamburgerMenu';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
}

export default function Header({
  darkMode,
  toggleDarkMode,
  increaseFontSize,
  decreaseFontSize,
}: HeaderProps) {
  const pathname = usePathname();

  // Map pathnames to titles
  const titles: Record<string, string> = {
    '/': 'HOME',
    '/about': 'ABOUT',
    '/tests': 'TESTS',
    '/prisma': 'PRISMA/SEQUELIZE',
    '/docker': 'DOCKER',
  };

  // Fallback title if path not matched
  const title = titles[pathname] || 'No Title';

  return (
    <>
      {/* Colored Header */}
      <header className="px-3 py-2 sticky-top themed-header position-relative">
        <div className="d-flex align-items-center justify-content-between">
          <HamburgerMenu />

          <div className="position-absolute start-50 translate-middle-x fw-bold">
            {title}
          </div>

          <div className="ms-auto text-end">
            <div className="fw-bold">Student ID: 22239026</div>
          </div>
        </div>
      </header>

      {/* Plain Controls Row */}
      <div className="d-flex justify-content-end align-items-center gap-3 px-3 py-2">
        {/* Dark/Light toggle */}
        <div className="form-check form-switch mb-0">
          <input
            className="form-check-input"
            type="checkbox"
            id="themeToggle"
            checked={darkMode}
            onChange={toggleDarkMode}
          />
          <label className="form-check-label" htmlFor="themeToggle">
            {darkMode ? 'Dark' : 'Light'}
          </label>
        </div>

        {/* Font size controls */}
        <div className="d-flex gap-1">
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={decreaseFontSize}
            aria-label="Decrease font size"
          >
            A-
          </button>
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={increaseFontSize}
            aria-label="Increase font size"
          >
            A+
          </button>
        </div>
      </div>
    </>
  );
}
