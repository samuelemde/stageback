import Uploader from "~/components/uploader";

export default function Home() {
  return (
    <div className="flex h-full justify-center gap-4">
      <Uploader endpoint={"audioUploader"} />
      <Uploader endpoint={"imageUploader"} />
    </div>
  );
}
