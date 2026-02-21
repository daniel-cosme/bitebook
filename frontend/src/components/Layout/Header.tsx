import React from 'react';
import { useAuthStore } from '../../store/authStore';

const Header = () => {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="flex justify-between items-center px-6 py-4">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            {window.location.pathname.replace('/', '').replace('-', ' ').toUpperCase() || 'DASHBOARD'}
          </h1>
        </div>
        
        <div className="flex items-center">
          <div className="mr-4">
            <span className="text-sm text-gray-700">Olá, {user?.email.split('@')[0]}</span>
          </div>
          
          <button
            onClick={handleLogout}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Sair
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;