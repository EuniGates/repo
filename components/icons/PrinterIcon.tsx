import React from 'react';

interface IconProps {
  className?: string;
}

const PrinterIcon: React.FC<IconProps> = ({ className }) => (
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
        d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6 18.25m10.56 0L18 18.25m-12 0h12m-12 0a2.25 2.25 0 01-2.25-2.25V6.75A2.25 2.25 0 016 4.5h12a2.25 2.25 0 012.25 2.25v9.524a2.25 2.25 0 01-2.25 2.25h-12zm12-9.75p.75-.75V5.625c0-.621-.504-1.125-1.125-1.125H9.125c-.621 0-1.125.504-1.125 1.125v1.125c0 .621.504 1.125 1.125 1.125h5.25z" 
    />
  </svg>
);

export default PrinterIcon;
