import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';
import { Code2, LogOut, User } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Code2 className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">HackHub</span>
            </Link>
            
            {user && (
              <div className="hidden md:ml-8 md:flex md:space-x-8">
                <Link
                  to="/hackathons"
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    isActive('/hackathons') ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Hackathons
                </Link>
                {user?.role === 'admin' && (
                  <Link
                    to="/admin"
                    className={`px-3 py-2 text-sm font-medium transition-colors ${
                      isActive('/admin') ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Admin Dashboard
                  </Link>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <img
                    src={user.avatar || 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/32x32.png'}
                    alt={user.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-sm font-medium text-gray-700 hidden sm:block">
                    {user.name}
                  </span>
                  {user.role === 'admin' && (
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      Admin
                    </span>
                  )}
                </div>
                <Button variant="ghost" size="sm" onClick={logout}>
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="primary" size="sm">
                  <User className="w-4 h-4 mr-2" />
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
