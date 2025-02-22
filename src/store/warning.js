import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useWarningStore = create(
  persist(
    (set) => ({
      hasSeenWarning: false,
      setHasSeenWarning: () => set({ hasSeenWarning: true }),
    }),
    {
      name: "textsage-warning-store",
    }
  )
);
