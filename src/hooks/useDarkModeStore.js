import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useDarkModeStore = create(
  persist(
    (set) => ({
      isDark: false,
      toggle: () => set(state => {
        const newDark = !state.isDark;
        document.documentElement.classList.toggle("dark", newDark);
        return { isDark: newDark };
      }),
      init: () => {
        const prefersDark =
          localStorage.theme === "dark" ||
          (!("theme" in localStorage) &&
            window.matchMedia("(prefers-color-scheme: dark)").matches);
        document.documentElement.classList.toggle("dark", prefersDark);
        set({ isDark: prefersDark });
      },
    }),
    { name: "dark-theme" }
  )
);
