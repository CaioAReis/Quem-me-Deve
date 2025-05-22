import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { DefaultState } from "@/@types";

export const useSessionStore = create<DefaultState>()(
  persist(
    (set) => ({
      session: null,
      setSession: (session) => set({ session }),

      isDark: false,
      changeTheme: () => set((state) => ({ isDark: !state.isDark })),

      hiddenValues: false,
      changeVisibilityValues: () => set((state) => ({ hiddenValues: !state.hiddenValues })),

      hasHydrated: false,
    }),
    {
      name: "app-storage",
      storage: {
        getItem: async (key) => {
          const value = await AsyncStorage.getItem(key);
          return value ? JSON.parse(value) : null;
        },

        setItem: async (key, value) => {
          await AsyncStorage.setItem(key, JSON.stringify(value));
        },

        removeItem: async (key) => {
          await AsyncStorage.removeItem(key);
        },
      },
      onRehydrateStorage: (state) => {
        state.hasHydrated = true;
      },
    }
  )
);
