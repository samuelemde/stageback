import { type Album } from ".prisma/client";
import ImageWithFallback from "~/components/image-with-fallback";
import Link from "next/link";

export default function AlbumCard({ album }: { album: Album }) {
  return (
    <Link
      href={`albums/${album.id}`}
      className="flex cursor-pointer flex-col gap-4 rounded-md bg-muted p-4 hover:bg-accent"
    >
      <div className="relative aspect-square h-full w-full">
        <ImageWithFallback
          src={album.artworkUrl}
          alt="artwork"
          className="object-cover object-center"
          fill
          loading="lazy"
          sizes={"(min-width: 1024px) 25vw, 50vw"}
        />
      </div>
      <div>
        <div className="overflow-hidden whitespace-nowrap text-sm font-bold text-accent-foreground">
          {album.name}
        </div>
        <div className="flex gap-2 overflow-hidden overflow-ellipsis whitespace-nowrap text-sm font-light">
          <div>{album.year}</div>
          <div>{album.artist}</div>
        </div>
      </div>
    </Link>
  );
}
