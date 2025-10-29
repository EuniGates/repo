import React from 'react';

interface IconProps {
  className?: string;
}

const RulerIcon: React.FC<IconProps> = ({ className }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth={1.5} 
        stroke="currentColor" 
        className={className}
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 8.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v8.25A2.25 2.25 0 006 16.5h2.25m8.25-8.25H18a2.25 2.25 0 012.25 2.25v8.25A2.25 2.25 0 0118 20.25h-2.25m-8.25-8.25h-2.25m10.5 0v-2.25m-10.5 2.25v-2.25m10.5 2.25v2.25m0-4.5h-2.25m-2.25-2.25h-2.25m10.5 6.75v2.25m-10.5-2.25v2.25m6-10.5v-2.25m-2.25 2.25h-2.25" />
    </svg>
);

export default RulerIcon;