import { type Song } from ".prisma/client";
import usePlayer from "~/app/_hooks/usePlayer";
import React, { type MouseEvent, useEffect } from "react";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import PlayButton from "~/components/play-button";
import { formatDuration } from "~/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { type SongWithAlbum } from "~/trpc/shared";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import VersionConnector from "~/components/version-connecter";

const columns: ColumnDef<SongWithAlbum>[] = [
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
            href={`/audio/albums/${row.original.albumId}`}
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
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <VersionConnector
              trigger={
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  Version of...
                </DropdownMenuItem>
              }
            />
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

type SongListProps = {
  songs: SongWithAlbum[];
};

export default function SongList({ songs }: SongListProps) {
  const player = usePlayer();

  function onClick(e: MouseEvent, song: Song) {
    e.preventDefault();
    if (player.activeSong?.id !== song.id) player.setActiveSong(song);
    else player.togglePlay();
    if (player.tempIds.length) player.updateIds();
  }

  useEffect(() => {
    player.setTempIds(songs.map((song) => song.id));
  }, [player.setTempIds, songs]);

  const table = useReactTable({
    data: songs,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full overflow-auto rounded-md">
      <Table className="w-full table-fixed">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{ width: header.getSize() }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          <TableRow className="h-2" />
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                onDoubleClick={(e) => onClick(e, row.original)}
                onClick={() => {
                  table.toggleAllPageRowsSelected(false);
                  row.toggleSelected(true);
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
