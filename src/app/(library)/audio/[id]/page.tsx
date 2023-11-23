import { api } from "~/trpc/server";
import PageContent from "~/components/page-content";
import SongDetails from "~/app/(library)/audio/[id]/song-details";

export default async function AudioPage({
  params,
}: {
  params: { id: string };
}) {
  const song = await api.song.getById.query(params.id);

  if (!song) return <div>Track not found</div>;

  return (
    <PageContent>
      <SongDetails id={params.id} initialSong={song} />
    </PageContent>
  );
}
