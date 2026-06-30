import React from 'react';
import Projects from '../../sections/Projects';
import { portfolioData } from '../../data/portfolioData';

export const metadata = {
  title: 'Projects',
  description: 'A showcase of software engineering and full-stack projects.',
};

export default function ProjectsPage() {
  const { projects } = portfolioData;

  return (
    <div className="py-12">
      <Projects projects={projects} />
    </div>
  );
}
