import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import DecorativePanel from './components/DecorativePanel';
import Dashboard from './components/Dashboard';
import DealerDashboard from './components/DealerDashboard';

const App: React.FC = () => {
  const [userRole, setUserRole] = useState<'admin' | 'dealer' | null>(null);

  const handleLogin = (role: 'admin' | 'dealer') => {
    setUserRole(role);
  };

  const handleLogout = () => {
    setUserRole(null);
  };

  if (!userRole) {
    return (
      <div className="min-h-screen bg-slate-50 text-gray-800 flex justify-center items-center p-4">
        <div className="max-w-screen-xl w-full m-0 sm:m-8 bg-white shadow-xl rounded-2xl flex justify-center flex-1 overflow-hidden">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12 flex flex-col justify-center">
            <LoginForm onLogin={handleLogin} />
          </div>
          <div className="flex-1 bg-indigo-100 text-center hidden lg:flex rounded-r-2xl">
            <DecorativePanel />
          </div>
        </div>
      </div>
    );
  }

  return userRole === 'admin' 
    ? <Dashboard onLogout={handleLogout} /> 
    : <DealerDashboard onLogout={handleLogout} />;
};

export default App;
