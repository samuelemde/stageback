"use client";

import { type RouterOutputs } from "~/trpc/shared";
import { api } from "~/trpc/react";
import AlbumCard from "~/components/album-card";

export default function AlbumsPage({
  initialAlbums,
}: {
  initialAlbums: RouterOutputs["album"]["getAll"];
}) {
  const { data: albums } = api.album.getAll.useQuery(undefined, {
    initialData: initialAlbums,
  });

  return (
    <div className="grid w-full grid-cols-2 gap-x-4 gap-y-6 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8">
      {albums.map((album) => (
        <AlbumCard key={album.id} album={album} />
      ))}
    </div>
  );
}
