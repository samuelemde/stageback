import { getServerAuthSession } from "~/server/auth";
import Link from "next/link";
import PageContent from "~/components/page-content";
import { api } from "~/trpc/server";
import { AudioTable } from "~/app/(library)/audio/audio-table";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <PageContent className="justify-center gap-y-4 p-10">
      <p className="text-center text-2xl text-white">
        {session && <span>Logged in as {session.user?.name}</span>}
      </p>
      <Link
        href={session ? "/api/auth/signout" : "/api/auth/signin"}
        className="bg-muted text-background rounded-full px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
      >
        {session ? "Sign out" : "Sign in"}
      </Link>
    </PageContent>
  );
}
