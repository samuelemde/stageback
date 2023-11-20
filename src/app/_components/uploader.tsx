"use client";

import { UploadButton } from "~/lib/uploadthing";
import { useToast } from "~/components/ui/use-toast";
import { ToastAction } from "~/components/ui/toast";
import { api } from "~/trpc/react";
import { formatSongTitle } from "~/lib/utils";
import * as mm from "music-metadata-browser";
import { useSession } from "next-auth/react";
import { Prisma } from ".prisma/client";
import InputJsonValue = Prisma.InputJsonValue;

type UploaderProps = {
  endpoint: "imageUploader" | "audioUploader";
};

export default function Uploader({ endpoint }: UploaderProps) {
  const { toast } = useToast();
  const session = useSession();
  const utils = api.useUtils();
  const { mutate } = api.song.create.useMutation({
    onSuccess: () => {
      void utils.song.getAll.invalidate();
    },
  });

  return (
    <UploadButton
      endpoint={endpoint}
      onClientUploadComplete={async (res) => {
        if (!res?.[0] || !session.data?.user.id) return;

        const { key, name, url, size } = res[0];
        const metadata = await mm.fetchFromUrl(url, { duration: true });
        mutate({
          key,
          fileName: name,
          title: metadata.common.title ?? formatSongTitle(name),
          artist: metadata.common.artist ?? "Unknown",
          url,
          trackNo: metadata.common.track.no,
          trackOf: metadata.common.track.of,
          size: BigInt(size),
          duration: Math.floor(metadata.format.duration ?? 0),
          metadata: JSON.parse(
            JSON.stringify(metadata.common),
          ) as InputJsonValue,
          teamId: session.data.activeTeam.id,
          uploadedById: session.data.user.id,
        });
        toast({
          title: "Upload Successful!",
          description: "The following files have been uploaded: " + name,
          action: (
            <ToastAction altText="Go to library to see your files">
              Go to Library
            </ToastAction>
          ),
        });
      }}
      onUploadError={(error: Error) => {
        console.error(error);
        toast({
          variant: "destructive",
          title: "Upload Failed!",
          description: error.message,
        });
      }}
    />
  );
}
