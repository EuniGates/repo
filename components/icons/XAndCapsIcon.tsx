import React from 'react';

interface IconProps {
  className?: string;
}

const XAndCapsIcon: React.FC<IconProps> = ({ className }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth={2} 
        stroke="currentColor" 
        className={className}
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        <circle cx="6" cy="6" r="2.5" fill="currentColor" stroke="none" />
        <circle cx="18" cy="18" r="2.5" fill="currentColor" stroke="none" />
    </svg>
);

export default XAndCapsIcon;