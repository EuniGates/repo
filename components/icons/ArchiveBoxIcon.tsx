import React from 'react';

interface IconProps {
  className?: string;
}

const ArchiveBoxIcon: React.FC<IconProps> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5}
    stroke="currentColor" 
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4" 
    />
  </svg>
);

export default ArchiveBoxIcon;
