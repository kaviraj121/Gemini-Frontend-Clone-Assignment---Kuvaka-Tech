import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      stage: "phone",
      phone: null,
      setPhone: phone => set({ phone, stage: "otp" }),
      verifyOtp: () => set({ stage: "done" }),
      logout: () => set({ stage: "phone", phone: null }), // 👈 added logout
    }),
    { name: "gemini-auth" }
  )
);
