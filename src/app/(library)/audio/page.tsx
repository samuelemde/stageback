import { api } from "~/trpc/server";
import { columns } from "~/app/(library)/audio/columns";
import PageContent from "~/components/page-content";
import { AudioTable } from "~/app/(library)/audio/audio-table";

export const dynamic = "force-dynamic";

export default async function AudioListPage() {
  const titles = await api.title.getAll.query();

  return (
    <PageContent className="gap-10 p-10">
      <AudioTable columns={columns} titles={titles} />
    </PageContent>
  );
}
