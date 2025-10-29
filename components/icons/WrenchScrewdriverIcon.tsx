import React from 'react';

interface IconProps {
  className?: string;
}

const WrenchScrewdriverIcon: React.FC<IconProps> = ({ className }) => (
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
            d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.527-1.042.396-2.358-.4-3.176l-.75-.75a2.25 2.25 0 00-3.176.4l-3.03 2.496m0 0l-6.12 6.12A2.652 2.652 0 003 17.25L8.83 21a2.652 2.652 0 004.242 0l2.348-2.348" 
        />
        <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M9.75 11.25l1.5 1.5" 
        />
    </svg>
);

export default WrenchScrewdriverIcon;