import { api } from "~/trpc/server";
import PageContent from "~/components/page-content";
import SongDetails from "~/app/(library)/songs/[id]/song-details";
import { notFound } from "next/navigation";

export default async function AudioPage({
  params,
}: {
  params: { id: string };
}) {
  const song = await api.song.getById.query(params.id);

  if (!song) notFound();

  return (
    <PageContent>
      <SongDetails id={params.id} initialSong={song} />
    </PageContent>
  );
}
