import React from 'react';
import CheckCircleIcon from './icons/CheckCircleIcon';

interface ToastProps {
  message: string;
  show: boolean;
}

const Toast: React.FC<ToastProps> = ({ message, show }) => {
  return (
    <div
      className={`fixed bottom-10 left-1/2 -translate-x-1/2 transition-all duration-500 ease-in-out z-50 ${
        show ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10 pointer-events-none'
      }`}
    >
      <div className="bg-gray-900 text-white font-semibold py-3 px-6 rounded-full shadow-lg flex items-center space-x-3">
        <CheckCircleIcon className="h-5 w-5 text-green-400" />
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Toast;
