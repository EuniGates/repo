import React from 'react';

interface IconProps {
  className?: string;
}

const ZoomingTruckIcon: React.FC<IconProps> = ({ className }) => (
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
      d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13 17H6V6h10v4l5 4v3h-3z"
    />
    <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 17H3V4h11v2"
    />
    {/* Motion lines */}
    <path strokeLinecap="round" strokeLinejoin="round" d="M1 8h3" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M1 12h5" />
  </svg>
);

export default ZoomingTruckIcon;
