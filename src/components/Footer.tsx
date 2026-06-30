'use client';

import React from 'react';
import { PersonalInfo } from '../data/portfolioData';

interface FooterProps {
  personalInfo: PersonalInfo;
}

export default function Footer({ personalInfo }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-custom">
      <div className="footer-container-custom font-mono text-xs">
        {/* Left side: Active session status */}
        <div className="footer-session flex items-center gap-2">
          <span className="footer-dot-active">●</span>
          <span className="terminal-green-text">[session active]</span>
          <span className="footer-copyright">{personalInfo.name} © {currentYear}</span>
        </div>

        {/* Right side: social links */}
        <div className="footer-links-custom flex items-center gap-4">
          <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="footer-link-hover">
            github
          </a>
          <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="footer-link-hover">
            linkedin
          </a>
          <a href={personalInfo.twitter} target="_blank" rel="noopener noreferrer" className="footer-link-hover">
            twitter
          </a>
          <a href={`mailto:${personalInfo.email}`} className="footer-link-hover">
            email
          </a>
        </div>
      </div>
    </footer>
  );
}
