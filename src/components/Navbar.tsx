'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '../context/ThemeContext';
import { THEMES } from '../constants';
import { PersonalInfo } from '../data/portfolioData';

interface NavbarProps {
  personalInfo: PersonalInfo;
}

const NAV_PILLS = [
  { label: 'home', href: '/' },
  { label: 'about', href: '/about' },
  { label: 'projects', href: '/projects' },
  { label: 'blog', href: '/blogs' },
  { label: 'cv', href: '/cv' },
  { label: 'contact', href: '/contact' }
];

export default function Navbar({ personalInfo }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link href="/" className="navbar-logo font-mono text-sm">
          Chetandev@portfolio:<span className="terminal-green-text">~</span>$
        </Link>

        {/* Desktop Menu - Terminal pills without 'cd' prefix */}
        <div className="navbar-links">
          {NAV_PILLS.map((pill) => {
            const isActive =
              pill.href === '/'
                ? pathname === '/'
                : pathname.startsWith(pill.href);
            return (
              <Link
                key={pill.label}
                href={pill.href}
                className={`nav-pill font-mono ${isActive ? 'active' : ''}`}
              >
                {isActive && <span className="nav-pill-dot">●</span>}
                {pill.label}
              </Link>
            );
          })}

          <button
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === THEMES.DARK ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu controls */}
        <div className="mobile-controls">
          <button
            className="theme-toggle-btn mobile-theme-btn"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === THEMES.DARK ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>
            )}
          </button>

          <button
            className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu dropdown - pills navigation */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        {NAV_PILLS.map((pill) => {
          const isActive =
            pill.href === '/'
              ? pathname === '/'
              : pathname.startsWith(pill.href);
          return (
            <Link
              key={pill.label}
              href={pill.href}
              className={`mobile-nav-link font-mono ${isActive ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {isActive && <span className="nav-pill-dot mr-1">●</span>}
              {pill.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
