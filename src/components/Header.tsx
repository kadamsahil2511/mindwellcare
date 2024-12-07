import React, { useState, useEffect, useRef } from 'react';
import { Heart, LogOut, Crown, BookOpen, MessageCircle, X } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { usePremiumStore } from '../store/premiumStore';
import { LoginModal } from './LoginModal';

export const Header = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [showPremiumMenu, setShowPremiumMenu] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();
  const { isPremium, setPremium } = usePremiumStore();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowPremiumMenu(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowPremiumMenu(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handlePremiumClick = () => {
    if (!isAuthenticated) {
      setIsLoginModalOpen(true);
      return;
    }
    if (!isPremium) {
      // In a real app, this would open a payment modal or redirect to a payment page
      setPremium(true);
      alert('Premium features activated!');
    } else {
      setShowPremiumMenu(!showPremiumMenu);
    }
  };

  return (
    <>
      <header className="bg-white relative z-50">
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
              <div className="inline-flex items-center space-x-4">
                {isAuthenticated ? (
                  <>
                    <span className="text-gray-900">Welcome, {user?.name}</span>
                    <button
                      onClick={logout}
                      className="inline-flex items-center space-x-2 text-gray-500 hover:text-gray-700"
                    >
                      <LogOut className="h-5 w-5" />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsLoginModalOpen(true)}
                    className="inline-block bg-blue-600 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-blue-700"
                  >
                    Sign In
                  </button>
                )}
                <div className="relative" ref={menuRef}>
                  <button
                    onClick={handlePremiumClick}
                    className={`inline-flex items-center ${
                      isPremium 
                        ? 'bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900'
                        : 'bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900'
                    } py-2 px-4 border border-transparent rounded-md text-base font-medium text-white`}
                  >
                    <Crown className="h-5 w-5 mr-2" />
                    {isPremium ? 'Premium Active' : 'Get Premium'}
                  </button>
                  
                  {isPremium && showPremiumMenu && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 z-50">
                      <div className="py-1">
                        <a
                          href="#notes"
                          onClick={() => setShowPremiumMenu(false)}
                          className="group flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50"
                        >
                          <BookOpen className="mr-3 h-5 w-5 text-blue-600" />
                          Daily Notes
                        </a>
                        <a
                          href="#chat"
                          onClick={() => setShowPremiumMenu(false)}
                          className="group flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50"
                        >
                          <MessageCircle className="mr-3 h-5 w-5 text-blue-600" />
                          Chat with Us
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
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