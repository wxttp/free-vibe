'use client'
import { create } from "zustand";

export const useSongsStore = create((set) => ({
  songs: [],
  setSongs: (s) => set({ songs: s }),
}));