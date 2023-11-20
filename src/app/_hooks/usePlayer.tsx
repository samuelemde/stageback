import { create } from "zustand";
import { type Song } from ".prisma/client";

interface PlayerStore {
  activeSong?: Song;
  ids: bigint[];
  tempIds: bigint[];
  setActiveSong: (track: Song | undefined) => void;
  setIds: (ids: bigint[]) => void;
  setTempIds: (ids: bigint[]) => void;
  updateIds: () => void;
  reset: () => void;
  isPlaying: boolean;
  setIsPlaying: (value: boolean) => void;
  togglePlay: () => void;
}

const usePlayer = create<PlayerStore>((set) => ({
  activeSong: undefined,
  ids: [],
  tempIds: [],
  setActiveSong: (track) => set({ activeSong: track }),
  setIds: (ids) => set({ ids }),
  setTempIds: (ids) => set({ tempIds: ids }),
  updateIds: () => set((state) => ({ ids: state.tempIds, tempIds: [] })),
  reset: () => set({ ids: [], activeSong: undefined }),
  isPlaying: false,
  setIsPlaying: (value) => set({ isPlaying: value }),
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
}));

export default usePlayer;
