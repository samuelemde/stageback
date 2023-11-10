"use client";

import { ImSpinner2 } from "react-icons/im";
import { HiPause, HiPlay } from "react-icons/hi";
import PlayerButton from "~/components/player-button";
import * as React from "react";
import usePlayer from "~/app/_hooks/usePlayer";
import { type RefObject, useEffect, useState } from "react";

type PlayerControlsProps = { audioRef: RefObject<HTMLAudioElement> };

export default function PlayerControls({ audioRef }: PlayerControlsProps) {
  const player = usePlayer();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!audioRef.current) return;

    const handleCanPlay = () => {
      setIsReady(true);
    };

    const audioElement = audioRef.current;
    audioElement.addEventListener("canplay", handleCanPlay);

    return () => {
      audioElement.removeEventListener("canplay", handleCanPlay);
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
          <ImSpinner2 size={24} className="animate-spin" />
        ) : player.isPlaying ? (
          <HiPause size={40} />
        ) : (
          <HiPlay size={40} />
        )}
      </PlayerButton>
    </div>
  );
}
