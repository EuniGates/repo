import React from 'react';

interface IconProps {
  className?: string;
}

const TrendingDownIcon: React.FC<IconProps> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor" 
    strokeWidth={2}
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6" 
    />
  </svg>
);

export default TrendingDownIcon;