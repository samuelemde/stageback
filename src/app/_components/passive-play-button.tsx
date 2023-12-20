"use client";

import usePlayer from "~/app/_hooks/usePlayer";
import { HiPause, HiPlay } from "react-icons/hi2";
import { type HTMLAttributes } from "react";
import { cn } from "~/lib/utils";
import { type Song } from ".prisma/client";
import { type IconType } from "react-icons";

type PlayButtonProps = HTMLAttributes<HTMLDivElement> & {
  song: Song;
  size?: number;
};

export default function PassivePlayButton({
  song,
  size = 20,
  className,
}: PlayButtonProps) {
  const player = usePlayer();
  const isCurrentlyActive = player.activeSong?.id === song.id;

  const Icon = (
    isCurrentlyActive && player.isPlaying ? HiPause : HiPlay
  ) as IconType;

  return <Icon size={size} className={cn("ml-2", className)} />;
}
