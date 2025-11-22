import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ProgressState {
  progress: Record<string, number>; // ej: { "1a": 30, "2c": 100 }
  enabledLevels: string[]; // niveles que el usuario puede jugar
  setProgress: (levelId: string, percent: number) => void;
  resetProgress: () => void;
  enableLevel: (levelId: string) => void;
  disableLevel: (levelId: string) => void;
  resetEnabledLevels: () => void;
}

const INITIAL_ENABLED_LEVELS = ["1a", "2a", "3a", "4a", "5a", "6a", "7a"];

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      progress: {},
      enabledLevels: INITIAL_ENABLED_LEVELS,

      setProgress: (levelId, percent) =>
        set((state) => ({
          progress: { ...state.progress, [levelId]: percent },
        })),

      enableLevel: (levelId) =>
        set((state) => ({
          enabledLevels: Array.from(new Set([...state.enabledLevels, levelId])),
        })),

      disableLevel: (levelId) =>
        set((state) => ({
          enabledLevels: state.enabledLevels.filter((id) => id !== levelId),
        })),
      resetProgress: () => set({ progress: {} }),

      resetEnabledLevels: () => set({ enabledLevels: INITIAL_ENABLED_LEVELS }),
    }),
    {
      name: "progress-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);