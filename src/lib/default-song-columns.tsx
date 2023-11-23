import { type ColumnDef } from "@tanstack/react-table";
import { type SongWithAlbum } from "~/trpc/shared";
import PlayButton from "~/components/play-button";
import Link from "next/link";
import { formatDuration } from "~/lib/utils";
import React from "react";
import SongActions from "~/components/song-actions";

export const defaultSongColumns: ColumnDef<SongWithAlbum>[] = [
  {
    id: "playButton",
    header: () => <div className="sr-only">Play button</div>,
    size: 1,
    minSize: 1,
    maxSize: 1,
    cell: ({ row }) => <PlayButton song={row.original} />,
  },
  {
    header: "Title",
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
    header: "Album",
    accessorKey: "album",
    size: 60,
    cell: ({ row }) => {
      if (!row.original.albumId) return null;
      return (
        <div className="truncate">
          <Link
            className="hover:underline"
            href={`/coming-soon?id=${row.original.albumId}`}
          >
            {row.original.album?.name}
          </Link>
        </div>
      );
    },
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
    cell: ({ row }) => <SongActions song={row.original} />,
  },
];
