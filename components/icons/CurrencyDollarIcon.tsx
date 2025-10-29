
import React from 'react';

interface IconProps {
  className?: string;
}

const CurrencyDollarIcon: React.FC<IconProps> = ({ className }) => (
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
      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01M12 12v4m0-4a2 2 0 01.01-2.007M12 12a2 2 0 00-.01 2.007M12 12h.01M12 12h-.01M6 12a6 6 0 1112 0 6 6 0 01-12 0z" 
    />
  </svg>
);

export default CurrencyDollarIcon;
