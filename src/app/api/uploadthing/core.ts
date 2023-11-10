import { createUploadthing, type FileRouter } from "uploadthing/next";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";

const f = createUploadthing();

const auth = async () => {
  const session = await getServerAuthSession();
  if (!session?.user) throw new Error("Unauthorized");
  return session.user;
};

export const fileRouter = {
  imageUploader: f({ image: { maxFileSize: "8MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async () => {
      const user = await auth();
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const { key, name, url, size } = file;
      await db.image.create({
        data: {
          key,
          name,
          url,
          size,
          uploadedById: metadata.userId,
        },
      });
    }),

  audioUploader: f({
    audio: { maxFileSize: "32MB", contentDisposition: "attachment" },
  })
    .middleware(async () => {
      const user = await auth();
      return { userId: user.id };
    })
    .onUploadComplete(({ file }) => {
      console.log("audio upload complete: " + file.name);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof fileRouter;
