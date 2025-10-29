import React, { useState } from 'react';
import ShoppingCartIcon from './icons/ShoppingCartIcon';
import UsersIcon from './icons/UsersIcon';
import CogIcon from './icons/CogIcon';
import ChevronDownIcon from './icons/ChevronDownIcon';
import HomeIcon from './icons/HomeIcon';
import UsersGroupIcon from './icons/UsersGroupIcon';
import TruckIcon from './icons/TruckIcon';
import CreditCardIcon from './icons/CreditCardIcon';
import TagIcon from './icons/TagIcon';
import Logo from './Logo';
import ShieldCheckIcon from './icons/ShieldCheckIcon';
import CircleStackIcon from './icons/CircleStackIcon';
import RulerIcon from './icons/RulerIcon';

interface SideNavProps {
  activePage: string;
  setActivePage: (page: string) => void;
  isNavCollapsed: boolean;
  setIsNavCollapsed: (isCollapsed: boolean) => void;
}

const navItems = {
  Orders: {
    icon: <ShoppingCartIcon className="h-5 w-5" />,
    pages: ['Orders Dashboard', 'Orders Reports', 'Cover Inventory'],
  },
  Customers: {
    icon: <UsersGroupIcon className="h-5 w-5" />,
    pages: ['Customer Dashboard', 'Customers Reports', 'Customer Forms'],
  },
  'Safety Covers': {
    icon: <RulerIcon className="h-5 w-5" />,
    pages: ['A-B Measurements'],
  },
  Warranty: {
    icon: <ShieldCheckIcon className="h-5 w-5" />,
    pages: ['Warranty Registrations', 'Warranty Management'],
  },
  Vendors: {
    icon: <TruckIcon className="h-5 w-5" />,
    pages: ['Vendor Dashboard', 'Vendor Reports', 'Vendor Forms'],
  },
  Purchases: {
    icon: <CreditCardIcon className="h-5 w-5" />,
    pages: ['Purchases Dashboard'],
  },
  Pricing: {
    icon: <TagIcon className="h-5 w-5" />,
    pages: ['Safety Cover', 'Spa Cover', 'Taxes'],
  },
  Products: {
    icon: <CircleStackIcon className="h-5 w-5" />,
    pages: ['Make/Model Dashboard'],
  },
  HR: {
    icon: <UsersIcon className="h-5 w-5" />,
    pages: ['HR Dashboard', 'Positions', 'HR Reports', 'HR Forms'],
  },
  Admin: {
    icon: <CogIcon className="h-5 w-5" />,
    pages: ['Admin Dashboard', 'Announcements', 'Expenses'],
  },
};

const SideNav: React.FC<SideNavProps> = ({ activePage, setActivePage, isNavCollapsed, setIsNavCollapsed }) => {
  const [openCategory, setOpenCategory] = useState('Orders');

  const handleCategoryClick = (category: string) => {
    if (!isNavCollapsed) {
      setOpenCategory(openCategory === category ? '' : category);
    }
  };

  return (
    <aside 
        className={`flex-shrink-0 bg-white flex flex-col border-r border-slate-200 transition-all duration-300 ease-in-out ${isNavCollapsed ? 'w-20' : 'w-72'}`}
        onMouseEnter={() => setIsNavCollapsed(false)}
        onMouseLeave={() => setIsNavCollapsed(true)}
    >
      <div className="h-20 flex items-center justify-center px-4 border-b border-slate-200">
        <Logo className={`transition-all duration-300 ${isNavCollapsed ? 'h-10 w-10' : 'h-12 w-auto'}`} />
      </div>
      <nav className={`flex-1 py-6 space-y-2 overflow-y-auto overflow-x-hidden ${isNavCollapsed ? 'px-3' : 'px-6'}`}>
        <div className="space-y-2">
        {Object.entries(navItems).map(([category, { icon, pages }]) => (
          <div key={category}>
            <button
              onClick={() => handleCategoryClick(category)}
              className={`w-full flex items-center py-3 rounded-lg text-left text-gray-600 hover:bg-slate-100 hover:text-gray-900 transition-colors duration-200 ${isNavCollapsed ? 'justify-center' : 'justify-between px-4'}`}
            >
              <div className="flex items-center space-x-3">
                {React.cloneElement(icon, { className: 'h-5 w-5 flex-shrink-0'})}
                {!isNavCollapsed && <span className="font-semibold">{category}</span>}
              </div>
              {!isNavCollapsed && <ChevronDownIcon
                className={`h-5 w-5 transition-transform duration-300 ${
                  openCategory === category ? 'rotate-180' : ''
                }`}
              />}
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openCategory === category && !isNavCollapsed ? 'max-h-96' : 'max-h-0'
              }`}
            >
              <ul className="pl-4 pt-2 space-y-1">
                {pages.map((page) => (
                  <li key={page}>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setActivePage(page);
                      }}
                      className={`block py-2 px-4 rounded-md text-sm font-medium relative transition-colors duration-200 ${
                        activePage === page
                          ? 'text-indigo-600'
                          : 'text-gray-500 hover:text-gray-900 hover:bg-slate-100'
                      }`}
                    >
                      {activePage === page && <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 bg-indigo-600 rounded-r-full"></span>}
                      {page}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
        </div>
      </nav>
    </aside>
  );
};

export default SideNav;