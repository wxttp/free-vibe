import { create } from "zustand"
import { storeSongPlay } from "@/lib/library/song"

export const usePlayer = create((set, get) => ({
  queue: [],
  index: 0,
  current: null,
  isPlaying: false,
  duration: 0,
  progress: 0,
  volume: 1,
  repeat: false,
  shuffle: false,

  load: (queue, index = 0) => set({ queue, index, current: queue[index], progress: 0 }),
  play: async () => {
    const current = get().current
    if (current) {
      const res = await storeSongPlay(current.id)

      console.log(res);
    }
    set({ isPlaying: true })
  },
  pause: () => set({ isPlaying: false }),
  toggle: () => set({ isPlaying: !get().isPlaying }),
  next: () => {
    const { queue, index, repeat, shuffle } = get()

    if (!queue.length)
        return
    let i = shuffle ? Math.floor(Math.random() * queue.length) : index + 1
    if (i >= queue.length)
        i = repeat ? 0 : index
    set({ index: i, current: queue[i], progress: 0, isPlaying: true })
  },
  prev: () => {
    const { queue, index } = get()

    if (!queue.length)
        return
    const i = index - 1 < 0 ? 0 : index - 1
    set({ index: i, current: queue[i], progress: 0, isPlaying: true })
  },
  toggleShuffle: () => set(s => ({ shuffle: !s.shuffle })),
  toggleRepeat:  () => set(s => ({ repeat: !s.repeat  })),
  seek: (sec) => set({ progress: sec ?? 0 }),
  setCurrent: (track) => set({ current: track }),
  setDuration: (d) => set({ duration: d }),
  setProgress: (p) => set({ progress: p }),
  setVolume: (v) => set({ volume: v }),
  playerApi: {
    getCurrentTime: () => 0,
    getDuration: () => 1,
    seekTo: (_sec) => {},
  },
  setPlayerApi: (api) => set((s) => ({ playerApi: { ...s.playerApi, ...api } })),
}))
