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
import { formatDuration } from "~/lib/utils";
import React from "react";
import Link from "next/link";
import PlayButton from "~/components/play-button";

export const columns: ColumnDef<Title>[] = [
  {
    id: "playButton",
    cell: ({ row }) => <PlayButton id={row.original.id} />,
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
