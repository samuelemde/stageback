import { type ColumnDef } from "@tanstack/react-table";
import { type SongWithRelations } from "~/trpc/shared";
import IndexPlayButton from "~/components/index-play-button";
import Link from "next/link";
import { formatDuration } from "~/lib/utils";
import React from "react";
import SongActions from "~/components/song-actions";
import ImageWithFallback from "~/components/image-with-fallback";
import SongTitle from "~/components/song-title";

export const defaultSongColumns: ColumnDef<SongWithRelations>[] = [
  {
    id: "index",
    header: () => <div className="sr-only">Play button</div>,
    size: 25,
    accessorFn: (_, index) => index + 1,
    cell: ({ row }) => (
      <div className="flex justify-center">
        <IndexPlayButton song={row.original} index={row.getValue("index")} />
      </div>
    ),
  },
  {
    id: "artwork",
    header: () => <div className="sr-only">Artwork</div>,
    size: 25,
    cell: ({ row }) => (
      <ImageWithFallback
        src={row.original.artworkUrl ?? row.original.album?.artworkUrl}
        alt={"artwork"}
        width={40}
        height={40}
        className="rounded-sm"
      />
    ),
  },
  {
    header: "Title",
    accessorKey: "title",
    size: 100,
    cell: ({ row }) => <SongTitle song={row.original} />,
  },
  {
    header: "Album",
    accessorKey: "album",
    size: 100,
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
