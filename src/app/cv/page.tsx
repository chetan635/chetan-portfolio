import React from 'react';
import Experience from '../../sections/Experience';
import { portfolioData } from '../../data/portfolioData';

export const metadata = {
  title: 'CV / Experience',
  description: 'Professional experience timeline and career history.',
};

export default function CVPage() {
  const { experience } = portfolioData;

  return (
    <div className="py-12">
      <Experience experience={experience} />
    </div>
  );
}
