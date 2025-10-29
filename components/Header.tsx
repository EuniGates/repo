import React, { useState, useEffect, useRef } from 'react';
import BellIcon from './icons/BellIcon';
import LogoutIcon from './icons/LogoutIcon';
import UserIcon from './icons/UserIcon';

interface HeaderProps {
  pageTitle: string;
  onLogout: () => void;
  setActivePage: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ pageTitle, onLogout, setActivePage }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 lg:px-10 flex-shrink-0">
      <h1 className="text-2xl font-bold text-gray-800">{pageTitle}</h1>
      <div className="flex items-center space-x-5">
        <button className="p-2 rounded-full text-gray-500 hover:bg-slate-100 hover:text-gray-800 transition-colors">
            <BellIcon className="h-6 w-6" />
        </button>
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <img
              className="h-10 w-10 rounded-full object-cover ring-2 ring-offset-2 ring-transparent group-focus:ring-indigo-500"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              alt="User avatar"
            />
            <div className="hidden md:block text-left">
              <div className="font-semibold text-gray-800">Admin User</div>
              <div className="text-xs text-gray-500">admin@example.com</div>
            </div>
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 z-10 border border-slate-100">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setActivePage('My Profile');
                  setDropdownOpen(false);
                }}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-slate-100"
              >
                <UserIcon className="h-4 w-4 mr-3 text-gray-500" />
                Your Profile
              </a>
              <button
                onClick={onLogout}
                className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-slate-100"
              >
                <LogoutIcon className="h-4 w-4 mr-3 text-gray-500" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;