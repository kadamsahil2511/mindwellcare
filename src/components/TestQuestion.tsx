import React from 'react';
import type { Question } from '../types';

interface TestQuestionProps {
  question: Question;
  onAnswer: (value: number) => void;
  currentAnswer?: number;
}

export const TestQuestion: React.FC<TestQuestionProps> = ({ question, onAnswer, currentAnswer }) => {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-medium text-gray-900 mb-4">{question.text}</h3>
      <div className="space-y-2">
        {question.options.map((option, index) => (
          <label
            key={index}
            className={`flex items-center p-4 rounded-lg border cursor-pointer transition-colors
              ${currentAnswer === index 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:bg-gray-50'}`}
          >
            <input
              type="radio"
              name={`question-${question.id}`}
              value={index}
              checked={currentAnswer === index}
              onChange={() => onAnswer(index)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-3">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
};