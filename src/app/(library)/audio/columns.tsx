"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { type Title } from ".prisma/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";
import { LuMoreHorizontal } from "react-icons/lu";
import { HiPause, HiPlay } from "react-icons/hi2";
import { formatDuration } from "~/lib/utils";
import React, { useContext } from "react";
import { AudioCtx } from "~/app/_providers/audio-provider";
import Link from "next/link";

export const columns: ColumnDef<Title>[] = [
  {
    id: "playButton",
    cell: ({ table, row }) => {
      const { isPlaying, setCurrentTitle, currentTitle, togglePlayPause } =
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useContext(AudioCtx);

      const isDifferentTitle = currentTitle !== row.original;
      const shouldTogglePlay = !isPlaying || !isDifferentTitle;

      function onClick() {
        if (isDifferentTitle) setCurrentTitle(row.original);
        if (shouldTogglePlay) togglePlayPause();
        if (!row.getIsSelected()) {
          table.toggleAllPageRowsSelected(false);
        }
        row.toggleSelected(!row.getIsSelected());
      }

      return row.getIsSelected() && isPlaying ? (
        <HiPause size={20} onClick={onClick} className="ml-2 cursor-pointer" />
      ) : (
        <HiPlay size={20} onClick={onClick} className="ml-2 cursor-pointer" />
      );
    },
  },
  {
    header: "Title",
    accessorKey: "title",
  },
  {
    header: "Duration",
    cell: ({ row }) => formatDuration(row.original.duration ?? 0),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { url } = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <LuMoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
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
