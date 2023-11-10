"use client";

import { api } from "~/trpc/react";
import { DataTable } from "~/app/(library)/audio/data-table";
import { columns } from "~/app/(library)/audio/columns";
import Uploader from "~/components/uploader";
import PageContent from "~/components/page-content";

export default function AudioListPage() {
  const { data: titles } = api.title.getAll.useQuery();

  if (!titles) return null;

  return (
    <PageContent className="gap-10 p-10">
      <DataTable columns={columns} data={titles} />
      <Uploader endpoint={"audioUploader"} />
    </PageContent>
  );
}
