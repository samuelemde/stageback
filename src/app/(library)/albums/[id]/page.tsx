import PageContent from "~/components/page-content";
import { api } from "~/trpc/server";
import React from "react";
import { notFound } from "next/navigation";
import AlbumDetails from "~/app/(library)/albums/[id]/album-details";

export default async function AlbumPage({
  params,
}: {
  params: { id: string };
}) {
  const album = await api.album.getById.query(params.id);

  if (!album) notFound();

  return (
    <PageContent>
      <AlbumDetails id={params.id} initialAlbum={album} />
    </PageContent>
  );
}
