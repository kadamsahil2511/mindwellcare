import React from 'react';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { Features } from '../components/Features';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center py-12">
            <div className="lg:pr-8">
              <Hero />
            </div>
            <div className="hidden lg:block">
              <div className="aspect-video rounded-lg overflow-hidden shadow-xl bg-gray-100">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src="https://www.youtube.com/embed/rkZl2gsLUp4?si=o8NPeCTULocxkRXH" 
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  referrerPolicy="strict-origin-when-cross-origin" 
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <p className="mt-3 text-sm text-gray-500 text-center">
                Learn more about mental wellness and self-care
              </p>
            </div>
          </div>
        </div>
        <Features />
      </main>
    </div>
  );
};