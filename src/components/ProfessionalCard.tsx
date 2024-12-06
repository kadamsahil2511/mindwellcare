import React, { useState } from 'react';
import { Star } from 'lucide-react';
import type { Professional } from '../types';
import { BookingModal } from './BookingModal';

interface ProfessionalCardProps {
  professional: Professional;
}

export const ProfessionalCard: React.FC<ProfessionalCardProps> = ({ professional }) => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img
          src={professional.image}
          alt={professional.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900">{professional.name}</h3>
          <p className="text-sm text-gray-600">{professional.specialization}</p>
          <div className="mt-2 flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="ml-1 text-sm text-gray-600">{professional.rating}</span>
            <span className="mx-2 text-gray-300">•</span>
            <span className="text-sm text-gray-600">{professional.experience} years exp.</span>
          </div>
          <button
            onClick={() => setIsBookingModalOpen(true)}
            className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Book Consultation
          </button>
        </div>
      </div>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        professional={professional}
      />
    </>
  );
};