"use client";

import { ImSpinner2 } from "react-icons/im";
import { HiPause, HiPlay } from "react-icons/hi";
import PlayerButton from "~/components/player-button";
import * as React from "react";
import { type RefObject, useEffect, useState } from "react";
import usePlayer from "~/app/_hooks/usePlayer";

type PlayerControlsProps = { audioRef: RefObject<HTMLAudioElement> };

export default function PlayerControls({ audioRef }: PlayerControlsProps) {
  const player = usePlayer();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!audioRef.current) return;
    const audioElement = audioRef.current;

    let loadStartTimeout: NodeJS.Timeout;

    const handleCanPlay = () => {
      clearTimeout(loadStartTimeout);
      setIsReady(true);
    };

    const handleLoadStart = () => {
      loadStartTimeout = setTimeout(() => {
        setIsReady(true);
      }, 200);
      setIsReady(false);
    };

    audioElement.addEventListener("canplay", handleCanPlay);
    audioElement.addEventListener("loadstart", handleLoadStart);

    return () => {
      audioElement.removeEventListener("canplay", handleCanPlay);
      audioElement.removeEventListener("loadstart", handleLoadStart);
    };
  }, [audioRef]);

  return (
    <div>
      <PlayerButton
        disabled={!isReady}
        onClick={player.togglePlay}
        aria-label={player.isPlaying ? "Pause" : "Play"}
        size="icon"
        variant="icon"
      >
        {!isReady ? (
          <ImSpinner2 className="h-full w-full animate-spin p-1" />
        ) : player.isPlaying ? (
          <HiPause className="h-full w-full" />
        ) : (
          <HiPlay className="h-full w-full" />
        )}
      </PlayerButton>
    </div>
  );
}
