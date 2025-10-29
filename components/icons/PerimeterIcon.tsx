import React from 'react';

interface IconProps {
  className?: string;
}

const PerimeterIcon: React.FC<IconProps> = ({ className }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth={2} 
        stroke="currentColor" 
        className={className}
    >
        <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="3" fill="none" />
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="white" strokeWidth="1" strokeDasharray="3 3" fill="none" />
    </svg>
);

export default PerimeterIcon;