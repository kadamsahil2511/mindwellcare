import React from 'react';
import type { TestResult } from '../types';

interface TestResultProps {
  result: TestResult;
}

export const TestResultComponent: React.FC<TestResultProps> = ({ result }) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'mild': return 'text-green-600';
      case 'moderate': return 'text-yellow-600';
      case 'severe': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Your Assessment Results</h2>
      <div className="mb-4">
        <span className="text-gray-600">Severity Level: </span>
        <span className={`font-medium ${getSeverityColor(result.severity)}`}>
          {result.severity.charAt(0).toUpperCase() + result.severity.slice(1)}
        </span>
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Recommendations:</h3>
        <ul className="list-disc list-inside space-y-2">
          {result.recommendations.map((rec, index) => (
            <li key={index} className="text-gray-600">{rec}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};