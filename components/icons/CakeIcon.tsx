import React from 'react';

interface IconProps {
  className?: string;
}

const CakeIcon: React.FC<IconProps> = ({ className }) => (
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
            d="M21 15.75a.75.75 0 01-.75.75H3.75a.75.75 0 01-.75-.75V14.25m18 0A2.25 2.25 0 0018.75 12H5.25A2.25 2.25 0 003 14.25m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v8.25m18-8.25h-2.25m-13.5 0v-1.5c0-.414.336-.75.75-.75h1.5a.75.75 0 01.75.75v1.5m3 0v-1.5c0-.414.336-.75.75-.75h1.5a.75.75 0 01.75.75v1.5m3 0v-1.5c0-.414.336-.75.75-.75h1.5a.75.75 0 01.75.75v1.5M9 12a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm6 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" 
        />
    </svg>
);

export default CakeIcon;
