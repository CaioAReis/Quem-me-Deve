import { create } from "zustand";

import { DefaultState } from "@/@types";

export const useAppStore = create<DefaultState>((set) => ({
  isDark: false,
  changeTheme: () => set((state) => ({ isDark: !state.isDark })),

  hiddenValues: false,
  changeVisibilityValues: () => set((state) => ({ hiddenValues: !state.hiddenValues })),
}));
