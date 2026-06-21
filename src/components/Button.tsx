import React from 'react';
import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  [key: string]: any;
}

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  onClick, 
  href, 
  target, 
  rel, 
  type = 'button',
  className = '',
  ...props 
}: ButtonProps) {
  const buttonClass = `btn btn-${variant} btn-${size} ${className}`;

  if (href) {
    const isInternal = href.startsWith('/') || href.startsWith('#');
    if (isInternal) {
      return (
        <Link href={href} className={buttonClass} {...props}>
          {children}
        </Link>
      );
    }
    return (
      <a 
        href={href} 
        target={target} 
        rel={rel || (target === '_blank' ? 'noopener noreferrer' : undefined)}
        className={buttonClass}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <button 
      type={type} 
      className={buttonClass} 
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
