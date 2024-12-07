import { create } from 'zustand';

interface PremiumState {
  isPremium: boolean;
  setPremium: (status: boolean) => void;
}

export const usePremiumStore = create<PremiumState>((set) => ({
  isPremium: false,
  setPremium: (status) => set({ isPremium: status }),
})); 