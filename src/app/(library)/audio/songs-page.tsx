"use client";

import React from "react";
import { api } from "~/trpc/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import SongList from "~/components/song-list";
import { type SongWithAlbum } from "~/trpc/shared";
import { defaultSongColumns } from "~/lib/default-song-columns";

type DataTableProps = {
  masterVersions: SongWithAlbum[];
  allSongs: SongWithAlbum[];
};

export function SongsPage({ allSongs, masterVersions }: DataTableProps) {
  const { data: all } = api.song.getAll.useQuery(undefined, {
    initialData: allSongs,
  });
  const { data: masters } = api.song.getMainVersions.useQuery(undefined, {
    initialData: masterVersions,
  });

  return (
    <div>
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Main versions</TabsTrigger>
          <TabsTrigger value="password">All versions</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <SongList songs={masters} columns={defaultSongColumns} />
        </TabsContent>
        <TabsContent value="password">
          <SongList songs={all} columns={defaultSongColumns} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
