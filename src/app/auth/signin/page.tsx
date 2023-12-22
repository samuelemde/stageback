import SigninPage from "~/app/auth/signin/signin-page";
import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerAuthSession();
  if (session) {
    redirect("/");
  }

  return (
    <div className="flex h-full w-full items-center justify-center bg-background">
      <div className="flex  flex-col items-center overflow-auto rounded-md bg-card p-10 pt-4">
        <SigninPage />
      </div>
    </div>
  );
}
