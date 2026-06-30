import React from 'react';
import Projects from '../../sections/Projects';
import { portfolioData } from '../../data/portfolioData';

export const metadata = {
  title: 'Products',
  description: 'A list of featured products and software applications.',
};

export default function ProductsPage() {
  const { projects } = portfolioData;

  return (
    <div className="py-12">
      <Projects projects={projects} />
    </div>
  );
}
