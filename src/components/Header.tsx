import React, { useState } from 'react';
import { Heart, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { LoginModal } from './LoginModal';

export const Header = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();

  return (
    <>
      <header className="bg-white">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
          <div className="w-full py-6 flex items-center justify-between border-b border-gray-200">
            <div className="flex items-center">
              <a href="#landing" className="flex items-center space-x-2">
                <Heart className="h-8 w-8 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900">MindWell</span>
              </a>
            </div>
            <div className="ml-10 space-x-8">
              <a href="#landing" className="text-base font-medium text-gray-500 hover:text-gray-900">
                Home
              </a>
              <a href="#about" className="text-base font-medium text-gray-500 hover:text-gray-900">
                About
              </a>
              <a href="#assessment" className="text-base font-medium text-gray-500 hover:text-gray-900">
                Assessment
              </a>
              {isAuthenticated ? (
                <div className="inline-flex items-center space-x-4">
                  <span className="text-gray-900">Welcome, {user?.name}</span>
                  <button
                    onClick={logout}
                    className="inline-flex items-center space-x-2 text-gray-500 hover:text-gray-700"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="inline-block bg-blue-600 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-blue-700"
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