import React from 'react';

interface IconProps {
  className?: string;
}

const WaveIcon: React.FC<IconProps> = ({ className }) => (
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
      d="M4 8c2-2 4-2 6 0s4 2 6 0 4-2 6 0M4 12c2-2 4-2 6 0s4 2 6 0 4-2 6 0M4 16c2-2 4-2 6 0s4 2 6 0 4-2 6 0"
    />
  </svg>
);

export default WaveIcon;