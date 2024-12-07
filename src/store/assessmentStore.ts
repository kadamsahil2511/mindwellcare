import { create } from 'zustand';

interface AssessmentState {
  report: string | null;
  setReport: (report: string) => void;
}

export const useAssessmentStore = create<AssessmentState>((set) => ({
  report: null,
  setReport: (report) => set({ report }),
})); 