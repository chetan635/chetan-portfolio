'use client';

import React, { useState, useRef } from 'react';
import Button from '../components/Button';
import { HERO_STRINGS, HERO_CODE_JS, HERO_CODE_JSON, HERO_CODE_MD } from '../constants';
import { PersonalInfo } from '../data/portfolioData';

interface HeroProps {
  personalInfo: PersonalInfo;
}

export default function Hero({ personalInfo }: HeroProps) {
  const [activeTab, setActiveTab] = useState<'js' | 'json' | 'md'>('js');
  const ideRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    // Max tilt 12 degrees
    const tiltX = (mouseY / (height / 2)) * -12;
    const tiltY = (mouseX / (width / 2)) * 12;
    
    if (ideRef.current) {
      ideRef.current.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.01, 1.01, 1.01)`;
      ideRef.current.style.transition = 'none';
    }
  };

  const handleMouseLeave = () => {
    if (ideRef.current) {
      ideRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1.01, 1.01, 1.01)`;
      ideRef.current.style.transition = 'transform 0.5s ease-out';
    }
  };

  const renderCodeContent = () => {
    switch (activeTab) {
      case 'json':
        return (
          <code>
            &#123;<br />
            &nbsp;&nbsp;<span className="code-keyword">"frontend"</span>: [<br />
            &nbsp;&nbsp;&nbsp;&nbsp;{HERO_CODE_JSON.FRONTEND.map((s, idx) => (
              <React.Fragment key={idx}>
                <span className="code-string">"{s}"</span>{idx < HERO_CODE_JSON.FRONTEND.length - 1 ? ', ' : ''}
              </React.Fragment>
            ))}<br />
            &nbsp;&nbsp;],<br />
            &nbsp;&nbsp;<span className="code-keyword">"backend"</span>: [<br />
            &nbsp;&nbsp;&nbsp;&nbsp;{HERO_CODE_JSON.BACKEND.map((s, idx) => (
              <React.Fragment key={idx}>
                <span className="code-string">"{s}"</span>{idx < HERO_CODE_JSON.BACKEND.length - 1 ? ', ' : ''}
              </React.Fragment>
            ))}<br />
            &nbsp;&nbsp;],<br />
            &nbsp;&nbsp;<span className="code-keyword">"aiIntegration"</span>: [<br />
            &nbsp;&nbsp;&nbsp;&nbsp;{HERO_CODE_JSON.AI.map((s, idx) => (
              <React.Fragment key={idx}>
                <span className="code-string">"{s}"</span>{idx < HERO_CODE_JSON.AI.length - 1 ? ', ' : ''}
              </React.Fragment>
            ))}<br />
            &nbsp;&nbsp;]<br />
            &#125;<span className="terminal-cursor"></span>
          </code>
        );
      case 'md':
        return (
          <code>
            <span className="code-keyword">{HERO_CODE_MD.HEADING_PREFIX}{personalInfo.name.toUpperCase()}</span><br />
            <br />
            {HERO_CODE_MD.LINES.map((line, idx) => (
              <React.Fragment key={idx}>
                <span className="code-string">{line}</span><br />
              </React.Fragment>
            ))}
            <br />
            <span className="code-boolean">{HERO_CODE_MD.AVAILABILITY}</span><span className="terminal-cursor"></span>
          </code>
        );
      case 'js':
      default:
        return (
          <code>
            <span className="code-keyword">const</span> developer = &#123;<br />
            &nbsp;&nbsp;name: <span className="code-string">"{personalInfo.name}"</span>,<br />
            &nbsp;&nbsp;role: <span className="code-string">"{HERO_CODE_JS.ROLE}"</span>,<br />
            &nbsp;&nbsp;skills: [<br />
            &nbsp;&nbsp;&nbsp;&nbsp;{HERO_CODE_JS.SKILLS.map((skill, idx) => (
              <React.Fragment key={idx}>
                <span className="code-string">"{skill}"</span>{idx < HERO_CODE_JS.SKILLS.length - 1 ? ', ' : ''}
                {idx === 2 ? <><br />&nbsp;&nbsp;&nbsp;&nbsp;</> : ''}
              </React.Fragment>
            ))}<br />
            &nbsp;&nbsp;],<br />
            &nbsp;&nbsp;focus: <span className="code-string">"{HERO_CODE_JS.FOCUS}"</span>,<br />
            &nbsp;&nbsp;coffeeLover: <span className="code-boolean">true</span><br />
            &#125;;<span className="terminal-cursor"></span>
          </code>
        );
    }
  };

  const renderTerrainGrid = () => {
    const paths = [];
    // Wavy horizontal terrain lines
    for (let i = 0; i < 11; i++) {
      const y = 140 + i * 22; // perspective spacing
      const amp = 8 * (i / 10) + 2; // waves get larger closer to viewer
      const delay = i * 0.15;
      paths.push(
        <path
          key={`h-${i}`}
          d={`M -50 ${y} Q 100 ${y - amp} 250 ${y + amp} T 550 ${y}`}
          stroke="var(--color-accent)"
          strokeWidth="1.2"
          strokeOpacity={0.05 + (i / 10) * 0.3}
          style={{
            animation: 'terrainUndulate 4s ease-in-out infinite alternate',
            animationDelay: `${delay}s`,
            transformOrigin: `250px ${y}px`
          } as React.CSSProperties}
        />
      );
    }
    
    // Vertical perspective lines radiating from horizon
    for (let i = 0; i <= 14; i++) {
      const xRatio = i / 14;
      const startX = 250; // horizon center
      const startY = 120; // horizon Y
      const endX = xRatio * 600 - 50; // spread out wide at the bottom
      const endY = 380;
      paths.push(
        <path
          key={`v-${i}`}
          d={`M ${startX} ${startY} Q ${(startX + endX) / 2} ${(startY + endY) / 2 - 15} ${endX} ${endY}`}
          stroke="var(--color-accent)"
          strokeWidth="1"
          strokeOpacity={0.12}
        />
      );
    }
    return paths;
  };

  return (
    <section id="hero" className="hero-section">
      
      <div className="grid-2 hero-layout">
        <div className="hero-content">
          <div className="hero-badge">
            <svg className="badge-pulse-svg" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
              <circle cx="5" cy="5" r="3.5" fill="var(--color-accent)"/>
              <circle cx="5" cy="5" r="4.5" fill="none" stroke="var(--color-accent)" strokeWidth="1" className="ping-circle"/>
            </svg>
            {HERO_STRINGS.BADGE}
          </div>
          <h1 className="hero-name">
            <span className="name-highlight">{personalInfo.name}</span>
          </h1>
          <h2 className="hero-title">{personalInfo.title}</h2>
          <p className="hero-subheading">{personalInfo.subheading}</p>
          
          <div className="hero-actions">
            <Button href="#projects" variant="primary">
              {HERO_STRINGS.BUTTON_PRIMARY}
            </Button>
            <Button href="#contact" variant="secondary">
              {HERO_STRINGS.BUTTON_SECONDARY}
            </Button>
          </div>
        </div>
        
        <div 
          className="hero-visual"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Animated 3D Wireframe Grid Background */}
          <div className="hero-wireframe-container">
            <svg className="hero-wireframe-grid" viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M 0 120 C 150 120 350 120 500 120" stroke="var(--border-color)" strokeWidth="1" strokeOpacity="0.2" />
              {renderTerrainGrid()}
            </svg>
          </div>

          <div 
            className="hero-ide-window glass-panel"
            ref={ideRef}
          >
            <div className="ide-header">
              <div className="ide-dots">
                <span className="ide-dot red"></span>
                <span className="ide-dot yellow"></span>
                <span className="ide-dot green"></span>
              </div>
              <div className="ide-tabs">
                <button 
                  className={`ide-tab ${activeTab === 'js' ? 'active' : ''}`}
                  onClick={() => setActiveTab('js')}
                >
                  {HERO_STRINGS.TAB_JS}
                </button>
                <button 
                  className={`ide-tab ${activeTab === 'json' ? 'active' : ''}`}
                  onClick={() => setActiveTab('json')}
                >
                  {HERO_STRINGS.TAB_JSON}
                </button>
                <button 
                  className={`ide-tab ${activeTab === 'md' ? 'active' : ''}`}
                  onClick={() => setActiveTab('md')}
                >
                  {HERO_STRINGS.TAB_MD}
                </button>
              </div>
            </div>
            <div className="ide-body">
              <pre>
                {renderCodeContent()}
              </pre>
            </div>
          </div>
        </div>
      </div>
      
      <div className="hero-scroll-indicator">
        <a href="#about" aria-label={HERO_STRINGS.SCROLL_LABEL}>
          <span className="scroll-arrow">↓</span>
        </a>
      </div>
    </section>
  );
}
