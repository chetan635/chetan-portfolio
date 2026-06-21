'use client';

import React, { useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import { SECTION_HEADERS, PROJECTS_STRINGS } from '../constants';
import { Project } from '../data/portfolioData';

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  const [selectedTag, setSelectedTag] = useState<string>(PROJECTS_STRINGS.FILTER_ALL);

  // Extract unique tags and prepend 'All'
  const uniqueTags = [
    PROJECTS_STRINGS.FILTER_ALL,
    ...Array.from(new Set(projects.flatMap((project) => project.tags)))
  ];

  const filteredProjects = selectedTag === PROJECTS_STRINGS.FILTER_ALL 
    ? projects 
    : projects.filter((project) => project.tags.includes(selectedTag));

  return (
    <section id="projects" className="projects-section timeline-blue">
      <div className="section-timeline-layout">
        <div className="section-timeline-left">
          <div className="section-timeline-dot"></div>
          <div className="section-timeline-line"></div>
        </div>
        
        <div className="section-timeline-right">
          <div className="section-header reveal-on-scroll reveal-slide-up">
            <p className="section-subtitle">{SECTION_HEADERS.PROJECTS.subtitle}</p>
            <h2 className="section-title">{SECTION_HEADERS.PROJECTS.title}</h2>
          </div>
          
          {/* Interactive Filter Menu */}
          <div className="projects-filter reveal-on-scroll reveal-fade">
            {uniqueTags.map((tag) => (
              <button
                key={tag}
                className={`filter-btn ${selectedTag === tag ? 'active' : ''}`}
                onClick={() => setSelectedTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
          
          <div key={selectedTag} className="grid-3 projects-grid projects-grid-animate stagger-children">
            {filteredProjects.map((project, idx) => (
              <Card 
                key={project.id} 
                className="project-card reveal-on-scroll reveal-scale"
                style={{ transitionDelay: `${idx * 0.08}s` } as React.CSSProperties}
              >
                <div className="project-image-container">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="project-image"
                    loading="lazy"
                  />
                  <div className="project-overlay">
                    <div className="overlay-links">
                      <Button 
                        href={project.githubLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        variant="secondary"
                        size="sm"
                      >
                        {PROJECTS_STRINGS.BTN_GITHUB}
                      </Button>
                      <Button 
                        href={project.liveLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        variant="primary"
                        size="sm"
                      >
                        {PROJECTS_STRINGS.BTN_LIVE}
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="project-details">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc">{project.description}</p>
                  
                  <div className="project-tags">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className={`badge tag-badge ${selectedTag === tag ? 'active-tag' : ''}`}
                        onClick={() => setSelectedTag(tag)}
                        style={{ cursor: 'pointer' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
