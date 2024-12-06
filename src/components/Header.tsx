import React, { useState } from 'react';
import { Heart, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { LoginModal } from './LoginModal';

export const Header = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();

  return (
    <>
      <header className="bg-dark-800 border-b border-dark-700">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
          <div className="w-full py-6 flex items-center justify-between">
            <div className="flex items-center">
              <a href="#landing" className="flex items-center space-x-2">
                <Heart className="h-8 w-8 text-blue-500" />
                <span className="text-2xl font-bold text-dark-50">MindWell</span>
              </a>
            </div>
            <div className="ml-10 space-x-8">
              <a href="#landing" className="text-base font-medium text-dark-300 hover:text-dark-50">
                Home
              </a>
              <a href="#about" className="text-base font-medium text-dark-300 hover:text-dark-50">
                About
              </a>
              <a href="#assessment" className="text-base font-medium text-dark-300 hover:text-dark-50">
                Assessment
              </a>
              {isAuthenticated ? (
                <div className="inline-flex items-center space-x-4">
                  <span className="text-dark-50">Welcome, {user?.name}</span>
                  <button
                    onClick={logout}
                    className="inline-flex items-center space-x-2 text-dark-300 hover:text-dark-50"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="inline-block bg-blue-600 py-2 px-4 border border-transparent rounded-md text-base font-medium text-dark-50 hover:bg-blue-700"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </nav>
      </header>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
};