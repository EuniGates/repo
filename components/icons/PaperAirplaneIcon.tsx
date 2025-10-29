import React from 'react';

interface IconProps {
  className?: string;
}

const PaperAirplaneIcon: React.FC<IconProps> = ({ className }) => (
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
      d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4"
    />
  </svg>
);

export default PaperAirplaneIcon;
