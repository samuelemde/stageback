import { api } from "~/trpc/server";

export default async function AudioPage({
  params,
}: {
  params: { id: string };
}) {
  const title = await api.title.getById.query(params.id);
  if (!title) return <div>Track not found</div>;

  return (
    <div className="flex w-full flex-col items-center justify-between gap-10 pb-2 pt-10">
      <h1 className="text-xl font-bold">{title.title}</h1>
    </div>
  );
}
