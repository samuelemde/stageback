"use client";

import { api } from "~/trpc/react";
import { type RouterOutputs } from "~/trpc/shared";
import ImageWithFallback from "~/components/image-with-fallback";
import React from "react";
import usePlayer from "~/app/_hooks/usePlayer";
import SongList from "~/components/song-list";
import { type ColumnDef } from "@tanstack/react-table";
import { type Song } from ".prisma/client";
import Link from "next/link";
import { formatDuration } from "~/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";
import { HiEllipsisHorizontal, HiPlay } from "react-icons/hi2";

const columns: ColumnDef<Song>[] = [
  {
    header: "Version",
    accessorKey: "title",
    size: 100,
    cell: ({ row }) => (
      <div className="truncate">
        <Link
          className="hover:underline"
          href={`/audio/${row.original.id}`}
          onClick={(e) => e.stopPropagation()}
          onDoubleClick={(e) => e.stopPropagation()}
        >
          {row.getValue("title")}
        </Link>
        <div className="text-xs text-foreground/60">{row.original.artist}</div>
      </div>
    ),
  },
  {
    header: () => <div className="text-right">Duration</div>,
    accessorKey: "duration",
    size: 10,
    cell: ({ row }) => (
      <div className="text-right">
        {formatDuration(row.getValue("duration") ?? 0)}
      </div>
    ),
  },
  {
    id: "actions",
    size: 5,
    cell: ({ row }) => {
      const { url } = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 cursor-default p-0">
              <span className="sr-only">Open menu</span>
              <HiEllipsisHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              Promote to main version
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(url)}
            >
              Copy file url
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={url} download rel="noopener noreferrer">
                Download
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

type SongDetailsProps = {
  id: string;
  initialSong: NonNullable<RouterOutputs["song"]["getById"]>;
};

export default function SongDetails({ initialSong, id }: SongDetailsProps) {
  const player = usePlayer();
  const { data: song } = api.song.getById.useQuery(id, {
    initialData: initialSong,
  });

  if (!song) return null;

  return (
    <div className="flex w-full flex-col gap-16">
      <div className="flex w-full flex-row gap-10">
        <ImageWithFallback
          src={song.artwork?.url}
          alt={"artwork"}
          width={300}
          height={300}
          className="rounded-md"
        />

        <div className="flex cursor-default flex-col items-start justify-end">
          <h1 className="text-xl font-bold">{song.title}</h1>
          <h3 className="pb-10 text-sm font-medium">{song.artist}</h3>
          <Button
            onClick={() => {
              player.setActiveSong(song);
              player.setIsPlaying(true);
            }}
            className="gap-2"
          >
            <HiPlay size={20} />
            <span>Main Version</span>
          </Button>
        </div>
      </div>
      {!!song.versions.length && (
        <SongList songs={song.versions} columns={columns} />
      )}
    </div>
  );
}
