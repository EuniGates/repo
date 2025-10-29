
import React from 'react';

interface IconProps {
  className?: string;
}

const DesignIcon: React.FC<IconProps> = ({ className }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth={1.5} 
        stroke="currentColor" 
        className={className}
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.43 2.43a4.5 4.5 0 008.642-2.43 3 3 0 00-1.128-5.78z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3 3 0 00-3-3m0 0a3 3 0 00-3 3m3-3h3m-3 3v3m3-3V9m3-3H9m3 0V3m3 3V3m-3 3h3" />
    </svg>
);

export default DesignIcon;