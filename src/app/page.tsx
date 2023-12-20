import PageWithAuth from "~/components/page-with-auth";
import Uploader from "~/components/uploader";
import { Sidebar } from "~/components/sidebar";

export default function Home() {
  return (
    <Sidebar>
      <PageWithAuth>
        <div className="flex h-full justify-center gap-4">
          <Uploader endpoint={"audioUploader"} />
          <Uploader endpoint={"imageUploader"} />
        </div>
      </PageWithAuth>
    </Sidebar>
  );
}
