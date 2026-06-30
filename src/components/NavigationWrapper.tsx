'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import { PersonalInfo } from '../data/portfolioData';

interface WrapperProps {
  personalInfo: PersonalInfo;
}

export function NavbarWrapper({ personalInfo }: WrapperProps) {
  const pathname = usePathname();
  if (pathname === '/') return null;
  return <Navbar personalInfo={personalInfo} />;
}

export function FooterWrapper({ personalInfo }: WrapperProps) {
  const pathname = usePathname();
  if (pathname === '/') return null;
  return <Footer personalInfo={personalInfo} />;
}
