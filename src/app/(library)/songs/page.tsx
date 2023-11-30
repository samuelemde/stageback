import { api } from "~/trpc/server";
import { SongsPage } from "~/app/(library)/songs/songs-page";
import PageContent from "~/components/page-content";

export default async function Page() {
  const [all, masters] = await Promise.all([
    api.song.getAll.query(),
    api.song.getMainVersions.query(),
  ]);

  return (
    <PageContent className="gap-10">
      <SongsPage allSongs={all} mainVersions={masters} />
    </PageContent>
  );
}
