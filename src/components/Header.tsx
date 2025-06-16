import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, Scale, GitCompare } from 'lucide-react';

const Header: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: null },
    { path: '/generate', label: 'Generate Document', icon: FileText },
    { path: '/review', label: 'Review Contract', icon: Scale },
    { path: '/compare', label: 'Compare Contract', icon: GitCompare },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-3">
              <img 
                src="https://www.aganitha.ai/wp-content/uploads/2023/05/aganitha-logo.png" 
                alt="Aganitha Logo" 
                className="h-8 w-auto"
              />
              {/* <div className="text-xl font-bold text-blue-900">ARC Documents</div> */}
            </Link>
          </div>
          
          <nav className="flex space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-blue-700 bg-blue-50'
                      : 'text-gray-600 hover:text-blue-700 hover:bg-gray-50'
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;