import React from 'react';

interface IconProps {
  className?: string;
}

const MegaphoneIcon: React.FC<IconProps> = ({ className }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth={1.5} 
        stroke="currentColor" 
        className={className}
    >
        <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M10.5 6a7.5 7.5 0 100 15h8.05a1.5 1.5 0 001.442-1.158l-2.094-8.376a1.5 1.5 0 00-1.442-1.158H10.5z" 
        />
        <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M6 6h.008v.008H6V6zM6 10.5h.008v.008H6v-.008zm0 4.5h.008v.008H6v-.008zM10.5 6V3.75a1.5 1.5 0 011.5-1.5h2.25a1.5 1.5 0 011.5 1.5V6" 
        />
    </svg>
);

export default MegaphoneIcon;
