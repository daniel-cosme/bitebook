import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  HomeIcon, 
  CalendarIcon, 
  UserGroupIcon, 
  CreditCardIcon, 
  CogIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';
import { useAuthStore } from '../../store/authStore';

const Sidebar = () => {
  const { user } = useAuthStore();
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: HomeIcon },
    { name: 'Agenda', href: '/appointments', icon: CalendarIcon },
    { name: 'Pacientes', href: '/patients', icon: UserGroupIcon },
    { name: 'Financeiro', href: '/payments', icon: CreditCardIcon },
    { name: 'Prontuários', href: '/records', icon: DocumentTextIcon },
    { name: 'Configurações', href: '/settings', icon: CogIcon },
  ];

  // Filter navigation based on user role
  const filteredNavigation = navigation.filter(item => {
    // Receptionists can't access records
    if (user?.role === 'receptionist' && item.name === 'Prontuários') {
      return false;
    }
    return true;
  });

  return (
    <div className="flex flex-col h-full bg-gray-800 text-white">
      <div className="p-4">
        <h1 className="text-xl font-bold">Clínica {user?.clinicId || 'OdontoCare'}</h1>
      </div>
      
      <nav className="flex-1 px-2 py-4 space-y-1">
        {filteredNavigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`${
                isActive 
                  ? 'bg-gray-900 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              } group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors`}
            >
              <item.icon
                className={`${
                  isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'
                } mr-3 h-5 w-5 flex-shrink-0`}
                aria-hidden="true"
              />
              {item.name}
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center">
          <div className="ml-3">
            <p className="text-sm font-medium text-white">{user?.email}</p>
            <p className="text-xs font-medium text-gray-400 capitalize">{user?.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;