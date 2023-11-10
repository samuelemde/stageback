import { create } from "zustand";

interface PlayerStore {
  id?: string;
  ids: string[];
  tempIds: string[];
  setId: (id: string) => void;
  setIds: (ids: string[]) => void;
  setTempIds: (ids: string[]) => void;
  updateIds: () => void;
  reset: () => void;
  isPlaying: boolean;
  setIsPlaying: (value: boolean) => void;
  togglePlay: () => void;
}

const usePlayer = create<PlayerStore>((set) => ({
  ids: [],
  tempIds: [],
  id: undefined,
  setId: (id) => set({ id: id }),
  setIds: (ids) => set({ ids }),
  setTempIds: (ids) => set({ tempIds: ids }),
  updateIds: () => set((state) => ({ ids: state.tempIds, tempIds: [] })),
  reset: () => set({ ids: [], id: undefined }),
  isPlaying: false,
  setIsPlaying: (value) => set({ isPlaying: value }),
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
}));

export default usePlayer;
