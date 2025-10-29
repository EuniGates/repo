import React, { useState } from 'react';
import UserIcon from './icons/UserIcon';
import LockIcon from './icons/LockIcon';
import EyeIcon from './icons/EyeIcon';
import EyeOffIcon from './icons/EyeOffIcon';
import Logo from './Logo';

interface LoginFormProps {
  onLogin: (role: 'admin' | 'dealer') => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [role, setRole] = useState<'admin' | 'dealer'>('admin');

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(role);
  }

  return (
    <div className="w-full">
      <div className="flex justify-center mb-12">
        <Logo className="w-28 h-28" />
      </div>
      <div className="px-4 sm:px-0">
        <div className="mb-8">
            <div className="flex justify-center bg-slate-100 rounded-full p-1 w-max mx-auto">
                <button 
                    onClick={() => setRole('admin')}
                    className={`px-6 py-2 text-sm font-semibold rounded-full transition-colors ${role === 'admin' ? 'bg-white text-indigo-600 shadow' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Admin
                </button>
                <button 
                    onClick={() => setRole('dealer')}
                    className={`px-6 py-2 text-sm font-semibold rounded-full transition-colors ${role === 'dealer' ? 'bg-white text-indigo-600 shadow' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Dealer
                </button>
            </div>
        </div>
        
        <h2 className="text-3xl font-bold mb-2 text-gray-800">Welcome back, {role === 'admin' ? 'Admin' : 'Dealer'}</h2>
        <p className="text-gray-600 mb-8">Enter your credentials to access your dashboard.</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input 
                id="email"
                type="email" 
                placeholder="you@example.com" 
                className="w-full pl-10 pr-4 py-3 bg-slate-100 border border-transparent rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
                defaultValue={role === 'admin' ? "admin@example.com" : "dealer@aquapools.com"}
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input 
                id="password"
                type={showPassword ? 'text' : 'password'} 
                placeholder="••••••••" 
                className="w-full pl-10 pr-10 py-3 bg-slate-100 border border-transparent rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
                defaultValue="password"
              />
              <button 
                type="button" 
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-indigo-600"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
              </button>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input id="remember" name="remember" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
              <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>
            <a href="#" className="text-sm font-semibold text-indigo-600 hover:text-indigo-500">
              Forgot password?
            </a>
          </div>

          <button 
            type="submit" 
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-indigo-300"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
