"use client";

import React from "react";
import { api } from "~/trpc/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import SongList from "~/components/song-list";
import { type SongWithAlbum } from "~/trpc/shared";

interface DataTableProps {
  masterVersions: SongWithAlbum[];
  allSongs: SongWithAlbum[];
}

export function SongsPage({ allSongs, masterVersions }: DataTableProps) {
  const [{ data: all }, { data: masters }] = api.useQueries((t) => [
    t.song.getAll(undefined, { initialData: allSongs }),
    t.song.getAllMasters(undefined, { initialData: masterVersions }),
  ]);

  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Main versions</TabsTrigger>
        <TabsTrigger value="password">All versions</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <SongList songs={masters!} />
      </TabsContent>
      <TabsContent value="password">
        <SongList songs={all!} />
      </TabsContent>
    </Tabs>
  );
}
