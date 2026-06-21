import React from 'react';
import Card from '../components/Card';
import { SECTION_HEADERS, ABOUT_STRINGS } from '../constants';
import { PersonalInfo } from '../data/portfolioData';

interface AboutProps {
  personalInfo: PersonalInfo;
}

export default function About({ personalInfo }: AboutProps) {
  return (
    <section id="about" className="about-section timeline-purple">
      <div className="section-timeline-layout">
        <div className="section-timeline-left">
          <div className="section-timeline-dot"></div>
          <div className="section-timeline-line"></div>
        </div>
        
        <div className="section-timeline-right">
          <div className="section-header reveal-on-scroll reveal-slide-up">
            <p className="section-subtitle">{SECTION_HEADERS.ABOUT.subtitle}</p>
            <h2 className="section-title">{SECTION_HEADERS.ABOUT.title}</h2>
          </div>
          
          <div className="grid-2 about-content">
            <div className="about-bio reveal-on-scroll reveal-slide-left glass-panel">
              <p className="bio-text">{personalInfo.bio}</p>
              <p className="bio-subtext">{ABOUT_STRINGS.BIO_SUBTEXT}</p>
              
              {/* Circuit line-art drawing matching Figma style */}
              <div className="circuit-art-container">
                <svg className="circuit-art-svg" viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 10 50 h 40 l 15 -15 h 60 l 15 15 h 50" stroke="var(--color-mint)" strokeWidth="1.2" strokeOpacity="0.25" strokeLinecap="round" />
                  <path d="M 30 75 h 30 l 10 -10 h 50 l 10 10 h 40" stroke="var(--color-mint)" strokeWidth="0.8" strokeOpacity="0.15" strokeLinecap="round" strokeDasharray="3 3" />
                  <circle cx="10" cy="50" r="3" fill="var(--color-mint)" />
                  <circle cx="190" cy="50" r="3" fill="var(--color-mint)" />
                  <circle cx="85" cy="35" r="2" fill="var(--color-mint)" stroke="var(--bg-secondary)" strokeWidth="1" />
                </svg>
              </div>
            </div>
            
            <div className="about-stats grid-2 stagger-children">
              <Card className="stat-card reveal-on-scroll reveal-scale">
                <div className="stat-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-mint)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="about-svg">
                    <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/>
                    <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/>
                  </svg>
                </div>
                <h3 className="stat-title">{ABOUT_STRINGS.STATS.EDUCATION.title}</h3>
                <p className="stat-value">{ABOUT_STRINGS.STATS.EDUCATION.value}</p>
              </Card>
              
              <Card className="stat-card reveal-on-scroll reveal-scale">
                <div className="stat-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-mint)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="about-svg">
                    <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                    <rect width="20" height="14" x="2" y="6" rx="2"/>
                  </svg>
                </div>
                <h3 className="stat-title">{ABOUT_STRINGS.STATS.EXPERIENCE.title}</h3>
                <p className="stat-value">{ABOUT_STRINGS.STATS.EXPERIENCE.value}</p>
              </Card>
              
              <Card className="stat-card reveal-on-scroll reveal-scale">
                <div className="stat-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-mint)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="about-svg">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <h3 className="stat-title">{ABOUT_STRINGS.STATS.LOCATION.title}</h3>
                <p className="stat-value">{ABOUT_STRINGS.STATS.LOCATION.value}</p>
              </Card>
              
              <Card className="stat-card reveal-on-scroll reveal-scale">
                <div className="stat-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-mint)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="about-svg">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                  </svg>
                </div>
                <h3 className="stat-title">{ABOUT_STRINGS.STATS.AVAILABILITY.title}</h3>
                <p className="stat-value">{ABOUT_STRINGS.STATS.AVAILABILITY.value}</p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
