"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { HiVolumeOff, HiVolumeUp } from "react-icons/hi";
import AudioProgressBar from "~/components/audio-progress-bar";
import VolumeInput from "~/components/volume-input";
import TitleScroller from "~/components/title-scroller";
import PlayerControls from "~/components/player-controls";
import usePlayer from "~/app/_hooks/usePlayer";
import { HiXMark } from "react-icons/hi2";
import { Button } from "~/components/ui/button";

export default function AudioPlayer() {
  const { activeSong, ...player } = usePlayer();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [volume, setVolume] = useState(0.8);
  const [previousVolume, setPreviousVolume] = useState(0);

  // load new track
  useEffect(() => {
    if (!audioRef.current || !activeSong) return;
    audioRef.current.load();
    void audioRef.current.play();
    player.setIsPlaying(true);
  }, [activeSong]);

  // handle play/pause
  useEffect(() => {
    if (!audioRef.current) return;
    player.isPlaying ? void audioRef.current.play() : audioRef.current.pause();
  }, [player.isPlaying]);

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
  }, [player.togglePlay]);

  // use media keys to play/pause
  useEffect(() => {
    // Check if mediaSession is supported
    if ("mediaSession" in navigator) {
      navigator.mediaSession.setActionHandler("play", () =>
        player.setIsPlaying(true),
      );
      navigator.mediaSession.setActionHandler("pause", () =>
        player.setIsPlaying(false),
      );
    }
  }, [player.setIsPlaying]);

  const handleVolumeChange = (value: number) => {
    setVolume(value);
    if (audioRef.current) audioRef.current.volume = value;
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (audioRef.current.volume !== 0) {
      handleVolumeChange(0);
      setPreviousVolume(volume);
    } else {
      handleVolumeChange(previousVolume);
    }
  };

  if (!activeSong) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 h-[70px] bg-background px-8 py-3 text-background">
      <audio
        ref={audioRef}
        preload="auto"
        onCanPlay={(e) => (e.currentTarget.volume = volume)}
        onEnded={() => player.setIsPlaying(false)}
      >
        <source key={activeSong.id} type="audio/mpeg" src={activeSong.url} />
        Audio not supported
      </audio>

      <div className="flex items-center justify-between gap-8">
        <div className="flex w-1/6 flex-col">
          <TitleScroller title={activeSong.title} />
          <div className="text-xs font-light text-foreground">
            {activeSong.artist}
          </div>
        </div>
        <PlayerControls audioRef={audioRef} />
        <AudioProgressBar audioRef={audioRef} duration={activeSong.duration} />
        <div className="flex items-center justify-self-end">
          <Button
            variant="player"
            size="smallIcon"
            onClick={toggleMute}
            aria-label={volume === 0 ? "unmute" : "mute"}
          >
            {volume === 0 ? (
              <HiVolumeOff size={16} />
            ) : (
              <HiVolumeUp size={16} />
            )}
          </Button>
          <VolumeInput volume={volume} onVolumeChange={handleVolumeChange} />
        </div>
        <Button
          className="p-0"
          variant="player"
          aria-label="close player"
          onClick={() => player.setActiveSong(undefined)}
        >
          <HiXMark size={16} />
        </Button>
      </div>
    </div>
  );
}
