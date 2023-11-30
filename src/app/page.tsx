"use client";

import Link from "next/link";
import PageContent from "~/components/page-content";
import Uploader from "~/components/uploader";
import { Button } from "~/components/ui/button";
import { UploadDropzone } from "~/lib/uploadthing";
import { toast } from "~/components/ui/use-toast";
import { useSession } from "next-auth/react";
import { api } from "~/trpc/react";

export default function Home() {
  // const session = await getServerAuthSession();
  const { data: session } = useSession();
  const { mutate } = api.album.create.useMutation();

  return (
    <PageContent className="justify-center gap-y-20 p-10">
      <div className="flex flex-col items-center justify-center gap-4">
        <p className="text-center text-2xl text-white">
          {session && <span>Logged in as {session.user?.name}</span>}
        </p>
        <Button>
          <Link href={session ? "/api/auth/signout" : "/api/auth/signin"}>
            {session ? "Sign out" : "Sign in"}
          </Link>
        </Button>
      </div>
      <div className="flex gap-4">
        <Uploader endpoint={"audioUploader"} />
        <Uploader endpoint={"imageUploader"} />
      </div>
      <UploadDropzone
        endpoint="audioUploader"
        onClientUploadComplete={() => {
          toast({
            title: "Upload Successful!",
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
      <Button onClick={() => mutate({ name: "temp", artist: "amorph" })}>
        Create Album
      </Button>
    </PageContent>
  );
}
