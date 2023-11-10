"use client";

import { createContext, useState } from "react";
import { type Title } from ".prisma/client";

type AudioContext = {
  isPlaying: boolean;
  togglePlayPause: () => void;
  currentTitle?: Title;
  setCurrentTitle: React.Dispatch<React.SetStateAction<Title | undefined>>;
};

export const AudioCtx = createContext<AudioContext>({
  isPlaying: false,
  togglePlayPause: () => {
    throw new Error("togglePlayPause function must be overridden by provider");
  },
  currentTitle: undefined,
  setCurrentTitle: () => {
    throw new Error("setCurrentSong function must be overridden by provider");
  },
});

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentTitle, setCurrentTitle] = useState<Title | undefined>(
    undefined,
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const togglePlayPause = () => setIsPlaying((prevIsPlaying) => !prevIsPlaying);

  return (
    <AudioCtx.Provider
      value={{
        isPlaying,
        togglePlayPause,
        currentTitle,
        setCurrentTitle,
      }}
    >
      {children}
    </AudioCtx.Provider>
  );
}
