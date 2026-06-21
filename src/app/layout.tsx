import React from 'react';
import type { Metadata } from 'next';
import { ThemeProvider } from '../context/ThemeContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollRevealObserver from '../components/ScrollRevealObserver';
import { portfolioData } from '../data/portfolioData';

// Global styles
import '../styles/index.css';
import '../styles/Card.css';
import '../styles/Navbar.css';
import '../styles/Hero.css';
import '../styles/Marquee.css';
import '../styles/About.css';
import '../styles/Skills.css';
import '../styles/Projects.css';
import '../styles/Experience.css';
import '../styles/Contact.css';
import '../styles/Blogs.css';
import '../components/Footer.css';

export const metadata: Metadata = {
  title: {
    default: `${portfolioData.personalInfo.name} | Portfolio & Blog`,
    template: `%s | ${portfolioData.personalInfo.name}`
  },
  description: portfolioData.personalInfo.subheading,
  keywords: ['Portfolio', 'Blog', 'Software Engineer', 'Full Stack Developer', 'AI Integration'],
  authors: [{ name: portfolioData.personalInfo.name }],
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { personalInfo } = portfolioData;

  return (
    <html lang="en" className="dark">
      <body>
        <ThemeProvider>
          <div className="app-container">
            {/* Background Decorative Glowing Orbs */}
            <div className="glowing-orb orb-cyan"></div>
            <div className="glowing-orb orb-purple"></div>
            <div className="glowing-orb orb-pink"></div>

            <Navbar personalInfo={personalInfo} />
            
            <main className="main-content">
              {children}
            </main>
            
            <Footer personalInfo={personalInfo} />
            <ScrollRevealObserver />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
