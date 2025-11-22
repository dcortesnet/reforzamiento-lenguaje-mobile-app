import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface TrophyState {
  trophies: number;
  addTrophy: (amount?: number) => void;
  resetTrophies: () => void;
}

export const useTrophyStore = create<TrophyState>()(
  persist(
    (set, get) => ({
      trophies: 0,
      addTrophy: (amount = 1) => set({ trophies: get().trophies + amount }),
      resetTrophies: () => set({ trophies: 0 }),
    }),
    {
      name: "trophy-counter",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);