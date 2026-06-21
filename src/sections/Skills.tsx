'use client';

import React, { useEffect, useRef } from 'react';
import Card from '../components/Card';
import { SECTION_HEADERS } from '../constants';
import { SkillCategory } from '../data/portfolioData';

interface SkillProgressProps {
  name: string;
  level: number;
}

function SkillProgress({ name, level }: SkillProgressProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const percentageRef = useRef<HTMLSpanElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Trigger CSS bar fill transition directly on style width
          if (fillRef.current) {
            fillRef.current.style.width = `${level}%`;
          }

          // Count up the number using requestAnimationFrame for zero-re-renders
          let startTimestamp: number | null = null;
          const duration = 1200; // 1.2s duration

          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const currentCount = Math.floor(progress * level);
            
            if (percentageRef.current) {
              percentageRef.current.textContent = `${currentCount}%`;
            }
            
            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              if (percentageRef.current) {
                percentageRef.current.textContent = `${level}%`;
              }
            }
          };

          window.requestAnimationFrame(step);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [level]);

  return (
    <div className="skill-item" ref={containerRef}>
      <div className="skill-info">
        <span className="skill-name">{name}</span>
        <span className="skill-percentage" ref={percentageRef}>0%</span>
      </div>
      <div className="skill-bar-container">
        <div 
          className="skill-bar-fill" 
          ref={fillRef}
          style={{ width: '0%' }}
        >
          <span className="skill-bar-tip"></span>
        </div>
      </div>
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
                    <SkillProgress key={skill.name} name={skill.name} level={skill.level} />
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
