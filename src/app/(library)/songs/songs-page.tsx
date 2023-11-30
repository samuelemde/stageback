"use client";

import React from "react";
import { api } from "~/trpc/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import SongList from "~/components/song-list";
import { type SongWithRelations } from "~/trpc/shared";
import { defaultSongColumns } from "~/lib/default-song-columns";
import VersionConnector from "~/components/version-connecter";

type DataTableProps = {
  mainVersions: SongWithRelations[];
  allSongs: SongWithRelations[];
};

export function SongsPage({ allSongs, mainVersions }: DataTableProps) {
  const { data: all } = api.song.getAll.useQuery(undefined, {
    initialData: allSongs,
  });
  const { data: mains } = api.song.getMainVersions.useQuery(undefined, {
    initialData: mainVersions,
  });

  return (
    <div>
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Main versions</TabsTrigger>
          <TabsTrigger value="password">All versions</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <SongList songs={mains} columns={defaultSongColumns} />
        </TabsContent>
        <TabsContent value="password">
          <SongList songs={all} columns={defaultSongColumns} />
        </TabsContent>
      </Tabs>
      <VersionConnector />
    </div>
  );
}
