"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import Link from "next/link";
import { type Song } from ".prisma/client";
import useVersionConnector from "~/app/_hooks/useVersionConnector";

type SongActionsProps = {
  song: Song;
};

export default function SongActions({ song }: SongActionsProps) {
  const { setSong, setIsOpen: setVersionModalOpen } = useVersionConnector();
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 cursor-default p-0">
            <span className="sr-only">Open menu</span>
            <HiEllipsisHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onSelect={() => {
              setSong(song);
              setVersionModalOpen(true);
            }}
          >
            Version of...
          </DropdownMenuItem>
          {song.versionOfId && (
            <DropdownMenuItem>Promote to main version</DropdownMenuItem>
          )}
          {song.versionOfId && (
            <DropdownMenuItem>Unlink version</DropdownMenuItem>
          )}
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(song.url)}
          >
            Copy file url
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={song.url} download rel="noopener noreferrer">
              Download
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
