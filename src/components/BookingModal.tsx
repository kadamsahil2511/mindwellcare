import React, { useState } from 'react';
import { X, Calendar } from 'lucide-react';
import type { Professional } from '../types';
import { useAuthStore } from '../store/authStore';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  professional: Professional;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, professional }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would make an API call to book the appointment
    alert(`Appointment booked with ${professional.name} for ${date} at ${time}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
        >
          <X className="h-6 w-6" />
        </button>
        
        <div className="flex items-center space-x-4 mb-6">
          <img
            src={professional.image}
            alt={professional.name}
            className="h-16 w-16 rounded-full object-cover"
          />
          <div>
            <h2 className="text-2xl font-bold">{professional.name}</h2>
            <p className="text-gray-600">{professional.specialization}</p>
          </div>
        </div>

        {!isAuthenticated ? (
          <div className="text-center py-4">
            <p className="text-gray-600 mb-4">Please sign in to book an appointment</p>
            <a
              href="#"
              onClick={() => {
                onClose();
                // This would trigger the login modal in a real app
              }}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Sign In
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                Time
              </label>
              <select
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="">Select a time</option>
                <option value="09:00">9:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="14:00">2:00 PM</option>
                <option value="15:00">3:00 PM</option>
                <option value="16:00">4:00 PM</option>
              </select>
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <Calendar className="h-5 w-5 mr-2" />
              Book Appointment
            </button>
          </form>
        )}
      </div>
    </div>
  );
};