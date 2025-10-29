import React from 'react';

interface IconProps {
  className?: string;
}

const LinesIcon: React.FC<IconProps> = ({ className }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth={2} 
        stroke="currentColor" 
        className={className}
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);

export default LinesIcon;