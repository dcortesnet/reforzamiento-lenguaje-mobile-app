import AsyncStorage from "@react-native-async-storage/async-storage";
import { isSameDay, parseISO } from "date-fns";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface DailyLevelsState {
  completedDailyLevel: number;
  lastUpdateDate: string | null;
  resetDailyLevelIfNewDay: () => void;
  completeDailyLevel: () => void;
}

export const useDailyLevelsStore = create<DailyLevelsState>()(
  persist(
    (set, get) => ({
      completedDailyLevel: 0,
      lastUpdateDate: null,

      resetDailyLevelIfNewDay: () => {
        const lastUpdate = get().lastUpdateDate;
        const today = new Date();

        if (!lastUpdate) {
          set({
            completedDailyLevel: 0,
            lastUpdateDate: today.toISOString(),
          });
          return;
        }
        const lastDate = parseISO(lastUpdate);
        if (!isSameDay(lastDate, today)) {
          set({
            completedDailyLevel: 0,
            lastUpdateDate: today.toISOString(),
          });
        }
      },

      completeDailyLevel: () => {
        const state = get();
        if (state.completedDailyLevel < 5) {
          set({
            completedDailyLevel: state.completedDailyLevel + 1,
          });
        }
      },
    }),
    {
      name: "daily-levels-storage",
      onRehydrateStorage: () => (state, error) => {
        if (error) return;
        queueMicrotask(() => {
          state?.resetDailyLevelIfNewDay();
        });
      },
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
