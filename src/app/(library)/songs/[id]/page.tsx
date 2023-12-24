import { api } from "~/trpc/server";
import SongDetails from "~/app/(library)/songs/[id]/song-details";
import { notFound } from "next/navigation";

export default async function AudioPage({
  params,
}: {
  params: { id: string };
}) {
  const song = await api.song.getById.query(params.id);

  if (!song) notFound();

  return <SongDetails id={params.id} initialSong={song} />;
}
