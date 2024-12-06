import React from 'react';
import { Brain, Users, Clock, Shield } from 'lucide-react';

const features = [
  {
    name: 'Professional Assessment',
    description: 'Scientifically validated mental health screening tools.',
    icon: Brain
  },
  {
    name: 'Expert Therapists',
    description: 'Connect with licensed and experienced mental health professionals.',
    icon: Users
  },
  {
    name: 'Quick Results',
    description: 'Get immediate insights and personalized recommendations.',
    icon: Clock
  },
  {
    name: 'Private & Secure',
    description: 'Your privacy is our priority with end-to-end encryption.',
    icon: Shield
  }
];

export const Features = () => {
  return (
    <div className="py-12 bg-dark-800" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-dark-50 sm:text-4xl">
            Why Choose MindWell
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-dark-300 mx-auto">
            We provide comprehensive mental health support with a focus on accessibility and effectiveness.
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.name} className="pt-6">
                <div className="flow-root bg-dark-700 rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-blue-600 rounded-md shadow-lg">
                        <feature.icon className="h-6 w-6 text-dark-50" aria-hidden="true" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-dark-50 tracking-tight">
                      {feature.name}
                    </h3>
                    <p className="mt-5 text-base text-dark-300">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};