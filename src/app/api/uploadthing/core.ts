import { createUploadthing, type FileRouter } from "uploadthing/next";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import { formatSongTitle, getMetadata } from "~/lib/utils";
import { Prisma } from ".prisma/client";
import InputJsonValue = Prisma.InputJsonValue;

const f = createUploadthing();

const auth = async () => {
  const session = await getServerAuthSession();
  if (!session?.user || !session.activeTeam) throw new Error("Unauthorized");
  return session;
};

export const fileRouter = {
  imageUploader: f({ image: { maxFileSize: "8MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async () => {
      const session = await auth();
      return { ...session };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const { key, name, url, size } = file;
      await db.image.create({
        data: {
          key,
          name,
          url,
          size,
          uploadedById: metadata.user.id,
        },
      });
    }),

  audioUploader: f({
    audio: {
      maxFileSize: "32MB",
      contentDisposition: "attachment",
      maxFileCount: 10,
    },
  })
    .middleware(async () => {
      const session = await auth();
      return { ...session };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const { key, name, url, size } = file;
      const md = await getMetadata(url, size);
      await db.song.create({
        data: {
          key,
          fileName: name,
          title: md.common.title ?? formatSongTitle(name),
          artist: md.common.artist ?? "Unknown",
          album: md.common.album
            ? {
                connectOrCreate: {
                  where: { name: md.common.album },
                  create: { name: md.common.album },
                },
              }
            : undefined,
          url,
          trackNo: md.common.track.no,
          trackOf: md.common.track.of,
          size: BigInt(size),
          duration: Math.floor(md.format.duration ?? 0),
          metadata: JSON.parse(JSON.stringify(md.common)) as InputJsonValue,
          team: { connect: { id: metadata.activeTeam.id } },
          uploadedBy: { connect: { id: metadata.user.id } },
        },
      });
      console.log("audio upload complete: " + file.name);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof fileRouter;
