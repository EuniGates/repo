import React, { useState } from 'react';
import SideNav from './SideNav';
import MainContent from './MainContent';
import Header from './Header';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [activePage, setActivePage] = useState('Orders Dashboard');
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      <SideNav 
        activePage={activePage} 
        setActivePage={setActivePage} 
        isNavCollapsed={isNavCollapsed}
        setIsNavCollapsed={setIsNavCollapsed}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          pageTitle={activePage} 
          onLogout={onLogout}
          setActivePage={setActivePage} 
        />
        <MainContent activePage={activePage} setActivePage={setActivePage} />
      </div>
    </div>
  );
};

export default Dashboard;