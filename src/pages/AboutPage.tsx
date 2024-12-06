import React from 'react';
import { Header } from '../components/Header';
import { Brain, Heart, Users } from 'lucide-react';

export const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">About MindWell</h1>
          <p className="mt-4 text-xl text-gray-500">Our mission is to make mental health care accessible to everyone.</p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="text-center">
              <div className="flex justify-center">
                <Brain className="h-12 w-12 text-blue-600" />
              </div>
              <h2 className="mt-6 text-2xl font-semibold text-gray-900">Expert Care</h2>
              <p className="mt-4 text-gray-500">Our platform connects you with licensed mental health professionals who provide personalized care.</p>
            </div>

            <div className="text-center">
              <div className="flex justify-center">
                <Heart className="h-12 w-12 text-blue-600" />
              </div>
              <h2 className="mt-6 text-2xl font-semibold text-gray-900">Holistic Approach</h2>
              <p className="mt-4 text-gray-500">We believe in treating the whole person, not just symptoms, through comprehensive mental health assessments.</p>
            </div>

            <div className="text-center">
              <div className="flex justify-center">
                <Users className="h-12 w-12 text-blue-600" />
              </div>
              <h2 className="mt-6 text-2xl font-semibold text-gray-900">Community Support</h2>
              <p className="mt-4 text-gray-500">Join a supportive community of individuals on their journey to better mental health.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};