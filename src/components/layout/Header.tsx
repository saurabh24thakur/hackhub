
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Menu, X, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { useAuth } from '../../context/AuthContext';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const getNavLinks = () => {
    if (!user) {
      return [];
    }
    const links = [{ to: '/hackathons', text: 'Hackathons' }];
    if (user.role === 'admin') {
      links.push({ to: '/admin', text: 'Admin Dashboard' });
    }
    return links;
  };

  const navLinks = getNavLinks();

  const menuVariants = {
    closed: { opacity: 0, y: -20 },
    open: { opacity: 1, y: 0 },
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/50 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-6">
            <Link to="/" className="flex items-center space-x-2">
              <motion.div whileHover={{ rotate: 360 }}>
                <Code2 className="w-10 h-10 text-blue-600 dark:text-blue-500" />
              </motion.div>
              <span className="text-3xl font-bold text-gray-900 dark:text-white tracking-tighter">HackHub</span>
            </Link>
            {navLinks.length > 0 && (
              <div className="hidden md:flex items-center space-x-2">
                {navLinks.map(link => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className="px-4 py-2 text-lg font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    activeClassName="text-gray-900 dark:text-white"
                  >
                    {link.text}
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-gray-600 dark:text-gray-300 text-lg">Hi, {user.name}</span>
                <Button onClick={logout} variant="outline" size="lg">Logout</Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="lg">Login</Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="lg">
                    Get Started <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </>
            )}
          </div>

          <div className="flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white/95 dark:bg-black/90 backdrop-blur-lg"
          >
            <div className="px-4 pt-4 pb-8 space-y-4">
              {navLinks.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-3 rounded-md text-2xl font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  activeClassName="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  {link.text}
                </NavLink>
              ))}
            </div>
            <div className="py-6 px-4 border-t border-gray-200 dark:border-gray-800">
              {user ? (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xl font-semibold text-gray-800 dark:text-white">{user.name}</p>
                    <p className="text-lg text-gray-500 dark:text-gray-400">{user.email}</p>
                  </div>
                  <Button onClick={() => { logout(); setIsMenuOpen(false); }} variant="outline" size="lg">Logout</Button>
                </div>
              ) : (
                <div className="flex flex-col space-y-4">
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" size="lg" className="w-full text-2xl py-4">Login</Button>
                  </Link>
                  <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="primary" size="lg" className="w-full text-2xl py-4">
                      Get Started <ArrowRight className="ml-2 w-6 h-6" />
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
