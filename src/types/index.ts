export interface Question {
  id: number;
  text: string;
  options: string[];
}

export interface TestResult {
  severity: 'mild' | 'moderate' | 'severe';
  score: number;
  recommendations: string[];
}

export interface Professional {
  id: number;
  name: string;
  specialization: string;
  experience: number;
  image: string;
  rating: number;
}