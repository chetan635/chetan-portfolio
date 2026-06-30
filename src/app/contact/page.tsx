import React from 'react';
import Contact from '../../sections/Contact';
import { portfolioData } from '../../data/portfolioData';

export const metadata = {
  title: 'Contact Me',
  description: 'Get in touch for inquiries, collaborations, and contract opportunities.',
};

export default function ContactPage() {
  const { personalInfo } = portfolioData;

  return (
    <div className="py-12">
      <Contact personalInfo={personalInfo} />
    </div>
  );
}
