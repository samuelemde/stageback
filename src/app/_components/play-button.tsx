"use client";

import usePlayer from "~/app/_hooks/usePlayer";
import { HiPause, HiPlay } from "react-icons/hi2";
import { type HTMLAttributes, type MouseEvent } from "react";
import { cn } from "~/lib/utils";
import { type Song } from ".prisma/client";

type PlayButtonProps = HTMLAttributes<HTMLDivElement> & {
  song: Song;
  size?: number;
};

export default function PlayButton({
  song,
  size = 20,
  className,
}: PlayButtonProps) {
  const player = usePlayer();
  const isCurrentlyActive = player.activeSong?.id === song.id;

  function onClick(e: MouseEvent) {
    e.preventDefault();
    if (!isCurrentlyActive) player.setActiveSong(song);
    else player.togglePlay();
    if (player.tempIds.length) player.updateIds();
  }
  const Icon = isCurrentlyActive && player.isPlaying ? HiPause : HiPlay;

  return <Icon size={size} onClick={onClick} className={cn("", className)} />;
}
