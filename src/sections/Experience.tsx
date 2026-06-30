import React from 'react';
import TerminalCard from '../components/TerminalCard';
import { SECTION_HEADERS } from '../constants';
import { ExperienceItem } from '../data/portfolioData';

interface ExperienceProps {
  experience: ExperienceItem[];
}

export default function Experience({ experience }: ExperienceProps) {
  return (
    <section id="experience" className="experience-section timeline-orange">
      <div className="section-timeline-layout">
        <div className="section-timeline-left">
          <div className="section-timeline-dot"></div>
          <div className="section-timeline-line"></div>
        </div>
        
        <div className="section-timeline-right">
          <div className="section-header reveal-on-scroll reveal-slide-up">
            <p className="section-subtitle">{SECTION_HEADERS.EXPERIENCE.subtitle}</p>
            <h2 className="section-title">{SECTION_HEADERS.EXPERIENCE.title}</h2>
          </div>
          
          <div className="timeline reveal-on-scroll reveal-fade">
            {experience.map((exp, idx) => (
              <div 
                key={idx} 
                className="timeline-item reveal-on-scroll reveal-slide-left"
                style={{ transitionDelay: `${idx * 0.15}s` } as React.CSSProperties}
              >
                <div className="timeline-dot"></div>
                
                <div className="timeline-content">
                  <TerminalCard 
                    className="experience-card"
                    headerPath={`~/work/${exp.company.toLowerCase().replace(/ /g, '-')}`}
                    headerBadge="WORK"
                    title={exp.role}
                    subtitle={exp.company}
                    dateFrom={exp.period.split(' - ')[0] || exp.period}
                    dateTo={exp.period.split(' - ')[1] || 'Present'}
                    description={exp.description}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
