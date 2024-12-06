import React, { useState } from 'react';
import { Header } from '../components/Header';
import { TestQuestion } from '../components/TestQuestion';
import { TestResultComponent } from '../components/TestResult';
import { ProfessionalCard } from '../components/ProfessionalCard';
import { anxietyQuestions } from '../data/questions';
import { professionals } from '../data/professionals';
import type { TestResult } from '../types';

export const AssessmentPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [testCompleted, setTestCompleted] = useState(false);

  const handleAnswer = (answer: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const calculateResult = () => {
    const score = answers.reduce((acc, curr) => acc + curr, 0);
    let severity: 'mild' | 'moderate' | 'severe';
    
    if (score <= 3) severity = 'mild';
    else if (score <= 6) severity = 'moderate';
    else severity = 'severe';

    const recommendations = [
      "Consider regular counseling sessions",
      "Practice daily mindfulness exercises",
      "Maintain a regular sleep schedule",
    ];

    setTestResult({ severity, score, recommendations });
    setTestCompleted(true);
  };

  const handleNext = () => {
    if (currentQuestion < anxietyQuestions.length - 1) {
      setCurrentQuestion(curr => curr + 1);
    } else {
      calculateResult();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!testCompleted ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-6">Mental Health Assessment</h2>
              <div className="mb-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${((currentQuestion + 1) / anxietyQuestions.length) * 100}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Question {currentQuestion + 1} of {anxietyQuestions.length}
                </p>
              </div>
              
              <TestQuestion
                question={anxietyQuestions[currentQuestion]}
                onAnswer={handleAnswer}
                currentAnswer={answers[currentQuestion]}
              />
              
              <button
                onClick={handleNext}
                disabled={answers[currentQuestion] === undefined}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400"
              >
                {currentQuestion === anxietyQuestions.length - 1 ? 'Complete Test' : 'Next Question'}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {testResult && <TestResultComponent result={testResult} />}
            
            <div>
              <h2 className="text-2xl font-semibold mb-6">Recommended Professionals</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {professionals.map(professional => (
                  <ProfessionalCard key={professional.id} professional={professional} />
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};