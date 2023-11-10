"use client";

import * as React from "react";
import { useContext, useEffect, useRef, useState } from "react";
import PlayerButton from "~/components/player-button";
import { AudioCtx } from "~/app/_providers/audio-provider";
import { ImSpinner2 } from "react-icons/im";
import { HiPause, HiPlay, HiVolumeOff, HiVolumeUp } from "react-icons/hi";
import AudioProgressBar from "~/components/audio-progress-bar";
import { formatDuration } from "~/lib/utils";
import VolumeInput from "~/components/volume-input";
import TitleScroller from "~/components/title-scroller";

export default function AudioPlayer() {
  const { currentTitle, isPlaying, togglePlayPause } = useContext(AudioCtx);
  const audioRef = useRef<HTMLAudioElement>(null);

  const [isReady, setIsReady] = useState(false);
  const [currentProgress, setCurrentProgress] = React.useState(0);
  const [volume, setVolume] = useState(0.8);
  const [previousVolume, setPreviousVolume] = useState(0);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        void audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTitle]);

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

  if (!currentTitle) return null;

  return (
    <div className="bg-background text-background fixed inset-x-0 bottom-0 h-[70px] px-8 py-3">
      {currentTitle && (
        <audio
          key={currentTitle.url}
          ref={audioRef}
          preload="metadata"
          onCanPlay={(e) => {
            e.currentTarget.volume = volume;
            setIsReady(true);
          }}
          onEnded={() => togglePlayPause()}
          onTimeUpdate={(e) => setCurrentProgress(e.currentTarget.currentTime)}
        >
          <source type="audio/mpeg" src={currentTitle.url} />
        </audio>
      )}

      <div className="flex items-center justify-between gap-8">
        <div className="flex w-1/6 flex-col">
          <TitleScroller title={currentTitle.title} />
          <div className="text-foreground text-xs font-light">
            {currentTitle.artist}
          </div>
        </div>
        <PlayerButton
          disabled={!isReady}
          onClick={togglePlayPause}
          aria-label={isPlaying ? "Pause" : "Play"}
          size="icon"
          variant="icon"
        >
          {!isReady ? (
            <ImSpinner2 size={24} className="animate-spin" />
          ) : isPlaying ? (
            <HiPause size={40} />
          ) : (
            <HiPlay size={40} />
          )}
        </PlayerButton>
        <div className="flex flex-grow gap-2">
          <p className="text-foreground w-8 text-right text-xs font-light">
            {formatDuration(currentProgress)}
          </p>
          <div className="relative flex flex-grow">
            <AudioProgressBar
              duration={currentTitle.duration}
              currentProgress={currentProgress}
              onValueChange={(value) => {
                if (!audioRef.current) return;
                audioRef.current.currentTime = value[0]!;
                setCurrentProgress(value[0]!);
              }}
            />
          </div>
          <p className="text-foreground w-8 text-xs font-light">
            {formatDuration(currentTitle.duration)}
          </p>
        </div>
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
