import { api } from "~/trpc/server";
import PageContent from "~/components/page-content";
import AlbumCard from "~/components/album-card";

export default async function AlbumsPage() {
  const albums = await api.album.getAll.query();

  return (
    <PageContent>
      <div className="grid w-full grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:gap-y-10 lg:grid-cols-4 lg:gap-x-8">
        {albums.map((album) => (
          <AlbumCard key={album.id} album={album} />
        ))}
      </div>
    </PageContent>
  );
}
