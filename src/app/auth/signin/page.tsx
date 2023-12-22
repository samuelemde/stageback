import { getCsrfToken } from "next-auth/react";
import SigninPage from "~/app/auth/signin/signin-page";
import { cookies } from "next/headers";
import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerAuthSession();
  if (session) {
    redirect("/");
  }

  const csrfToken = await getCsrfToken({
    req: {
      headers: {
        cookie: cookies().toString(),
      },
    },
  });

  if (!csrfToken) {
    return null;
  }

  return (
    <div className="flex h-full w-full items-center justify-center bg-background">
      <div className="flex  flex-col items-center overflow-auto rounded-md bg-card p-10 pt-4">
        <SigninPage csrfToken={csrfToken} />
      </div>
    </div>
  );
}
