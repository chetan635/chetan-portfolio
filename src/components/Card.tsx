import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  [key: string]: any;
}

export default function Card({ children, className = '', onClick, style = {}, ...props }: CardProps) {
  return (
    <div 
      className={`card glass-panel ${className}`} 
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default', ...style }}
      {...props}
    >
      <div className="card-content">
        {children}
      </div>
    </div>
  );
}
