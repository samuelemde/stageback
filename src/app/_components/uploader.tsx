"use client";

import { UploadButton } from "~/lib/uploadthing";
import { useToast } from "~/components/ui/use-toast";
import { ToastAction } from "~/components/ui/toast";
import { api } from "~/trpc/react";
import { useSession } from "next-auth/react";

type UploaderProps = {
  endpoint: "imageUploader" | "audioUploader";
};

export default function Uploader({ endpoint }: UploaderProps) {
  const { toast } = useToast();
  const session = useSession();
  const utils = api.useUtils();

  return (
    <UploadButton
      className="ut-button:ut ut-button:bg-primary ut-button:after:bg-primary ut-button:focus-within:ring-0 ut-button:ut-uploading:bg-primary/50 ut-upload-icon:ut-uploading:bg-primary"
      endpoint={endpoint}
      onClientUploadComplete={async (res) => {
        await utils.song.getAll.invalidate();
        if (!res?.[0] || !session.data?.user.id) return;

        toast({
          title: "Upload Successful!",
          description:
            "The following files have been uploaded: " +
            res.map((r) => r.name).join(", "),
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
