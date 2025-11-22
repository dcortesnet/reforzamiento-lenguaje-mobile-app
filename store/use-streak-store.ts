import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  differenceInCalendarDays,
  isYesterday,
  parseISO,
} from "date-fns";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface StreakState {
  streakDays: number;
  lastPlayedDate: string | null; // YYYY-MM-DD
  playedDays: Record<string, boolean>;
  checkStreak: () => void;
  markDayAsPlayed: (date: string) => void;
  resetStreak: () => void;
}

export const useStreakStore = create<StreakState>()(
  persist(
    (set, get) => ({
      streakDays: 0,
      lastPlayedDate: null,
      playedDays: {},

      checkStreak: () => {
        const last = get().lastPlayedDate;
        if (!last) return;
        const lastDate = parseISO(last);
        const diffDays = differenceInCalendarDays(new Date(), lastDate);
        if (diffDays >= 2) {
          set({
            streakDays: 0,
            lastPlayedDate: null,
          });
        }
      },

      markDayAsPlayed: (date) =>
        set((state) => {
          if (state.playedDays[date]) {
            return state;
          }

          const parsed = parseISO(date);
          let newStreak = 1;

          if (state.lastPlayedDate) {
            if (isYesterday(parsed)) {
              newStreak = state.streakDays + 1;
            }
          }
          return {
            streakDays: newStreak,
            lastPlayedDate: date,
            playedDays: { ...state.playedDays, [date]: true },
          };
        }),

      resetStreak: () =>
        set({
          streakDays: 0,
          lastPlayedDate: null,
          playedDays: {},
        }),
    }),

    {
      name: "streak-storage",
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        queueMicrotask(() => state?.checkStreak());
      },
    }
  )
);
