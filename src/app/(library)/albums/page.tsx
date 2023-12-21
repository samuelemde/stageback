import { api } from "~/trpc/server";
import PageWithAuth from "~/components/page-with-auth";
import AlbumsPage from "~/app/(library)/albums/albums-page";

export default async function Page() {
  const albums = await api.album.getAll.query();

  return (
    <PageWithAuth>
      <AlbumsPage initialAlbums={albums} />
    </PageWithAuth>
  );
}
