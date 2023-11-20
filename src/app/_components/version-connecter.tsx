"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

type VersionConnectorProps = {
  trigger: React.ReactNode;
};

export default function VersionConnector({ trigger }: VersionConnectorProps) {
  const { data: songs } = api.song.getAllMasters.useQuery();

  if (!songs) return null;
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Connect version</DialogTitle>
          <DialogDescription>
            Make this song a version of another song.
          </DialogDescription>
        </DialogHeader>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select main" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {songs.map((song) => (
                <SelectItem key={song.id} value={song.title}>
                  {song.title}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
