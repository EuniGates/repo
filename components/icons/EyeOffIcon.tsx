
import React from 'react';

interface IconProps {
  className?: string;
}

const EyeOffIcon: React.FC<IconProps> = ({ className }) => (
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
      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a10.05 10.05 0 013.56-5.117m0 0l4.991 4.99m0 0l4.992 4.99M12 12a3 3 0 00-3-3m3 3a3 3 0 01-3 3m0-3c-.179.02-.355.053-.528.094M9.098 9.098a3.99 3.99 0 00-1.252 2.902c0 .414.052.815.148 1.194M15.481 15.481A3.99 3.99 0 0018 12a3.99 3.99 0 00-1.252-2.902M21 21L3 3" 
    />
  </svg>
);

export default EyeOffIcon;
