'use client';

import React, { useEffect, useRef } from 'react';
import Card from '../components/Card';
import { SECTION_HEADERS } from '../constants';
import { SkillCategory } from '../data/portfolioData';

interface SkillPillProps {
  name: string;
  icon: string;
}

function SkillPill({ name, icon }: SkillPillProps) {
  const folder = icon.split('-')[0];
  const iconUrl = `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${folder}/${icon}.svg`;

  return (
    <div className="skill-pill">
      <img src={iconUrl} alt={name} className="skill-icon" />
      <span className="skill-name">{name}</span>
    </div>
  );
}

interface SkillsProps {
  skills: SkillCategory[];
}

export default function Skills({ skills }: SkillsProps) {
  return (
    <section id="skills" className="skills-section timeline-green">
      <div className="section-timeline-layout">
        <div className="section-timeline-left">
          <div className="section-timeline-dot"></div>
          <div className="section-timeline-line"></div>
        </div>
        
        <div className="section-timeline-right">
          <div className="section-header reveal-on-scroll reveal-slide-up">
            <p className="section-subtitle">{SECTION_HEADERS.SKILLS.subtitle}</p>
            <h2 className="section-title">{SECTION_HEADERS.SKILLS.title}</h2>
          </div>
          
          <div className="grid-3 skills-grid stagger-children">
            {skills.map((categoryObj) => (
              <Card key={categoryObj.category} className="skills-card reveal-on-scroll reveal-scale">
                <h3 className="category-title">{categoryObj.category}</h3>
                <div className="skills-list">
                  {categoryObj.items.map((skill) => (
                    <SkillPill key={skill.name} name={skill.name} icon={skill.icon} />
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
