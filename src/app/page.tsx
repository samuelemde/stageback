import Link from "next/link";

import { CreatePost } from "~/app/_components/create-post";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { Sidebar } from "~/app/_components/sidebar";

export default async function Home() {
  const hello = await api.post.hello.query({ text: "from tRPC" });
  const session = await getServerAuthSession();

  return (
    <main className="text-foreground bg-muted flex min-h-screen flex-row items-center justify-center">
      <Sidebar className={"flex"} />
      <div className="relative flex min-h-screen flex-grow items-center justify-center">
        <div className="bg-background absolute inset-2 flex items-center justify-center rounded-xl">
          Hello
        </div>
      </div>
    </main>
  );
}
