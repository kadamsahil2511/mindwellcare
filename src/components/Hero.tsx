import React from 'react';
import { Heart, ArrowRight } from 'lucide-react';

export const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-dark-800">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-dark-800 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-dark-50 sm:text-5xl md:text-6xl">
                <span className="block">Take care of your</span>
                <span className="block text-blue-500">mental well-being</span>
              </h1>
              <p className="mt-3 text-base text-dark-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Start your journey to better mental health with our professional assessment tools and connect with experienced therapists who can help guide you.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <a
                    href="#assessment"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-dark-50 bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                  >
                    Start Assessment
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <a
                    href="#about"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-100 bg-dark-700 hover:bg-dark-600 md:py-4 md:text-lg md:px-10"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};