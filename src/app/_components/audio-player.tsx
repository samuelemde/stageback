"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import PlayerButton from "~/components/player-button";
import { HiVolumeOff, HiVolumeUp } from "react-icons/hi";
import AudioProgressBar from "~/components/audio-progress-bar";
import VolumeInput from "~/components/volume-input";
import TitleScroller from "~/components/title-scroller";
import { api } from "~/trpc/react";
import PlayerControls from "~/components/player-controls";
import { cn } from "~/lib/utils";
import usePlayer from "~/app/_hooks/usePlayer";

export default function AudioPlayer() {
  const { setIsPlaying, ...player } = usePlayer();
  const { data: currentTitle } = api.title.getById.useQuery(player.id!, {
    enabled: !!player.id,
    keepPreviousData: true,
  });

  const audioRef = useRef<HTMLAudioElement>(null);
  const [volume, setVolume] = useState(0.8);
  const [previousVolume, setPreviousVolume] = useState(0);

  useEffect(() => {
    console.log("PLAYY", player.isPlaying, audioRef.current);
    if (!audioRef.current) return;
    if (player.isPlaying) {
      void audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [player.isPlaying]);

  useEffect(() => {
    if (!audioRef.current || !currentTitle) return;
    audioRef.current.load();
    if (player.isPlaying) {
      void audioRef.current.play();
    } else setIsPlaying(true);
  }, [currentTitle?.id, setIsPlaying]);

  // use space bar to play/pause
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        player.togglePlay();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [player]);

  // use media keys to play/pause
  useEffect(() => {
    // Check if mediaSession is supported
    if ("mediaSession" in navigator) {
      navigator.mediaSession.setActionHandler("play", () => setIsPlaying(true));
      navigator.mediaSession.setActionHandler("pause", () =>
        setIsPlaying(false),
      );
    }
  }, [player]);

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (audioRef.current.volume !== 0) {
      handleVolumeChange(0);
      setPreviousVolume(volume);
    } else {
      handleVolumeChange(previousVolume);
    }
  };

  const handleVolumeChange = (volumeValue: number) => {
    if (!audioRef.current) return;
    audioRef.current.volume = volumeValue;
    setVolume(volumeValue);
  };

  // if (!player.id || !currentTitle) return null;

  return (
    <div
      className={cn(
        "bg-background text-background fixed inset-x-0 bottom-0 h-[70px] px-8 py-3",
        { hidden: !currentTitle || !player.id },
      )}
    >
      <audio
        ref={audioRef}
        preload="metadata"
        onCanPlay={(e) => (e.currentTarget.volume = volume)}
        onEnded={() => setIsPlaying(false)}
      >
        <source type="audio/mpeg" src={currentTitle?.url ?? ""} />
      </audio>

      <div className="flex items-center justify-between gap-8">
        <div className="flex w-1/6 flex-col">
          <TitleScroller title={currentTitle?.title} />
          <div className="text-foreground text-xs font-light">
            {currentTitle?.artist}
          </div>
        </div>
        <PlayerControls audioRef={audioRef} />
        <AudioProgressBar
          audioRef={audioRef}
          duration={currentTitle?.duration}
        />
        <div className="flex items-center justify-self-end">
          <PlayerButton
            variant="icon"
            size="smallIcon"
            onClick={toggleMute}
            aria-label={volume === 0 ? "unmute" : "mute"}
          >
            {volume === 0 ? (
              <HiVolumeOff size={16} />
            ) : (
              <HiVolumeUp size={16} />
            )}
          </PlayerButton>
          <VolumeInput volume={volume} onVolumeChange={handleVolumeChange} />
        </div>
      </div>
    </div>
  );
}
