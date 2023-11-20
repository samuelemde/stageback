"use client";

import { api } from "~/trpc/react";
import { type RouterOutputs } from "~/trpc/shared";
import ImageWithFallback from "~/components/image-with-fallback";
import React, { useState } from "react";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Separator } from "~/components/ui/separator";
import usePlayer from "~/app/_hooks/usePlayer";
import PlayButton from "~/components/play-button";

type SongDetailsProps = {
  id: bigint;
  initialSong: NonNullable<RouterOutputs["song"]["getById"]>;
};

export default function SongDetails({ initialSong, id }: SongDetailsProps) {
  const player = usePlayer();
  const { data: song } = api.song.getById.useQuery(id, {
    initialData: initialSong,
  });
  const [selectedVersion, setSelectedVersion] = useState(initialSong);

  if (!song) return null;

  return (
    <div className="flex w-full flex-col gap-10">
      <ImageWithFallback
        src={song.artwork?.url}
        alt={"artwork"}
        width={300}
        height={300}
        className="rounded-lg"
      />
      <div className="flex flex-row items-center gap-4">
        <PlayButton song={selectedVersion} size={25} className="pt-0.5" />
        <h1 className="text-xl font-bold">{selectedVersion.title}</h1>
      </div>
      {!!song.versions.length && (
        <ScrollArea className=" w-full rounded-md border sm:w-1/2">
          <div className="p-4">
            <h4 className="mb-4 text-sm font-medium leading-none">Versions</h4>
            {song.versions.map((version) => (
              <>
                <Separator className="my-2" />
                <div
                  key={version.id}
                  className="hover:bg-accent cursor-pointer rounded-md p-2 text-sm"
                  onClick={() => {
                    player.setActiveSong(version);
                  }}
                >
                  {version.title}
                </div>
              </>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
