import { api } from "~/trpc/server";
import React from "react";
import { notFound } from "next/navigation";
import AlbumDetails from "~/app/(library)/albums/[id]/album-details";

export default async function AlbumPage({
  params,
}: {
  params: { id: string };
}) {
  const [album, songs] = await Promise.all([
    api.album.getById.query(params.id),
    api.song.getMainVersionsForAlbum.query(params.id),
  ]);

  if (!album) notFound();

  return (
    <AlbumDetails id={params.id} initialAlbum={album} initialSongs={songs} />
  );
}
