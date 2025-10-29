import React, { useState, useEffect, useRef } from 'react';
import Logo from './Logo';
import LogoutIcon from './icons/LogoutIcon';

interface DealerHeaderProps {
  dealerName: string;
  onLogout: () => void;
  activePage: string;
  setActivePage: (page: string) => void;
}

const DealerHeader: React.FC<DealerHeaderProps> = ({ dealerName, onLogout, activePage, setActivePage }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = ['Dashboard', 'My Orders'];

  return (
    <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 lg:px-10 flex-shrink-0">
      <div className="flex items-center space-x-8">
        <Logo className="h-12 w-auto" />
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map(item => (
            <button
              key={item}
              onClick={() => setActivePage(item)}
              className={`text-sm font-semibold transition-colors ${
                activePage === item
                  ? 'text-indigo-600'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {item}
            </button>
          ))}
        </nav>
      </div>
      <div className="flex items-center space-x-5">
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-indigo-600">
              {dealerName.charAt(0)}
            </div>
            <div className="hidden md:block text-left">
              <div className="font-semibold text-gray-800">{dealerName}</div>
              <div className="text-xs text-gray-500">Dealer Account</div>
            </div>
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-10 border border-slate-100">
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

export default DealerHeader;