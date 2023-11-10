"use client";

import usePlayer from "~/app/_hooks/usePlayer";
import { HiPause, HiPlay } from "react-icons/hi2";
import { type HTMLAttributes, type MouseEvent } from "react";
import { cn } from "~/lib/utils";

type PlayButtonProps = HTMLAttributes<HTMLDivElement> & {
  id: string;
  size?: number;
};

export default function PlayButton({
  id,
  size = 20,
  className,
}: PlayButtonProps) {
  const player = usePlayer();

  const isCurrentlyActive = player.id === id;
  // const shouldTogglePlay = !player.isPlaying || isCurrentlyActive;

  function onClick(e: MouseEvent) {
    e.preventDefault();
    if (!isCurrentlyActive) player.setId(id);
    else player.togglePlay();
    if (player.tempIds.length) player.updateIds();
  }
  const Icon = isCurrentlyActive && player.isPlaying ? HiPause : HiPlay;

  return (
    <Icon
      size={size}
      onClick={onClick}
      className={cn("ml-2 cursor-pointer", className)}
    />
  );
}
