import { create } from "zustand";
import { persist } from "zustand/middleware";
import { nanoid } from "nanoid";

export const useChatStore = create(
  persist(
    (set, get) => ({
      rooms: [],                                 // [{ id, title }]
      addRoom: title =>
        set(state => ({
          rooms: [...state.rooms, { id: nanoid(6), title }],
        })),
      deleteRoom: id =>
        set(state => ({ rooms: state.rooms.filter(r => r.id !== id) })),
    }),
    { name: "gemini-chatrooms" }                 // localStorage key
  )
);
