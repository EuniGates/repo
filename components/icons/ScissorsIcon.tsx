
import React from 'react';

interface IconProps {
  className?: string;
}

const ScissorsIcon: React.FC<IconProps> = ({ className }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth={1.5} 
        stroke="currentColor" 
        className={className}
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.848 8.25l1.536 1.536m-1.536-1.536l6.364 6.364m-7.9 0l6.364-6.364m6.364 6.364l-6.364-6.364m2.122-2.122a3 3 0 10-4.242 0M7.5 12a3 3 0 100-4.243 3 3 0 000 4.243z" />
    </svg>
);

export default ScissorsIcon;