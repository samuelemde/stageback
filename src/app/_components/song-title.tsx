"use client";

import Link from "next/link";
import React from "react";
import usePlayer from "~/app/_hooks/usePlayer";
import { cn } from "~/lib/utils";
import { type Song } from ".prisma/client";

type SongTitleProps = {
  song: Song;
};

export default function SongTitle({ song }: SongTitleProps) {
  const player = usePlayer();
  const isActive = player.activeSong?.id === song.id;

  return (
    <div className="truncate">
      <Link
        className={cn("hover:underline", { "text-primary": isActive })}
        href={`/songs/${song.id}`}
        onClick={(e) => e.stopPropagation()}
        onDoubleClick={(e) => e.stopPropagation()}
      >
        {song.title}
      </Link>
      <div className="text-xs text-foreground/60">{song.artist}</div>
    </div>
  );
}
