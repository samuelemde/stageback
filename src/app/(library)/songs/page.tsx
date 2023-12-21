import { api } from "~/trpc/server";
import { SongsPage } from "~/app/(library)/songs/songs-page";
import PageWithAuth from "~/components/page-with-auth";

export default async function Page() {
  const [all, mains] = await Promise.all([
    api.song.getAll.query(),
    api.song.getMainVersions.query(),
  ]);

  return (
    <PageWithAuth>
      <SongsPage allSongs={all} mainVersions={mains} />
    </PageWithAuth>
  );
}
