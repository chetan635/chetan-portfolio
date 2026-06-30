import React from 'react';
import About from '../../sections/About';
import Skills from '../../sections/Skills';
import Marquee from '../../components/Marquee';
import { portfolioData } from '../../data/portfolioData';

export const metadata = {
  title: 'About Me',
  description: 'Learn more about Chetan Dev, Full Stack Developer & AI Engineer.',
};

export default function AboutPage() {
  const { personalInfo, skills } = portfolioData;

  return (
    <div className="py-12">
      <About personalInfo={personalInfo} />
      <Marquee />
      <Skills skills={skills} />
    </div>
  );
}
