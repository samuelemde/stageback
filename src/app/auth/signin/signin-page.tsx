"use client";

import { Button } from "~/components/ui/button";
import { signIn, type SignInOptions } from "next-auth/react";
import { IoLogoGoogle } from "react-icons/io";
import { BiLogoSpotify } from "react-icons/bi";
import { Separator } from "~/components/ui/separator";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useSearchParams } from "next/navigation";
import { cn } from "~/lib/utils";
import { AuthError } from "~/lib/error-map";

export default function SigninPage({ csrfToken }: { csrfToken: string }) {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? undefined;
  const error = searchParams.get("error") ?? undefined;
  const token = searchParams.get("token") ?? undefined;
  let redirect = "/teams";

  if (token) {
    redirect = `/invitation?token=${token}`;
  }

  if (callbackUrl) {
    const separator = redirect.includes("?") ? "&" : "?";
    redirect += `${separator}callbackUrl=${callbackUrl}`;
  }

  const options: SignInOptions = { redirect: true, callbackUrl: redirect };

  return (
    <>
      <h1
        className={cn("mb-12 mt-4 text-4xl font-bold text-accent-foreground", {
          "mb-6": !!error,
        })}
      >
        StageBack
      </h1>
      {error && (
        <div className="mb-6 w-full rounded-md bg-primary/10 p-2 text-sm text-primary">
          {AuthError[error as keyof typeof AuthError] ?? error}
        </div>
      )}
      <div className="flex h-full w-full flex-col items-center gap-8">
        <Button
          className="w-full bg-accent py-6 hover:bg-foreground/50"
          onClick={() => signIn("google", options)}
        >
          <div className="flex w-full items-center">
            <IoLogoGoogle className="mr-2 h-6 w-6 text-left" />
            <span className="flex-grow">Continue with Google</span>
          </div>
        </Button>
        <Button
          className="w-full bg-accent py-6 hover:bg-foreground/50"
          onClick={() => signIn("spotify", options)}
        >
          <div className="flex w-full items-center">
            <BiLogoSpotify className="mr-2 h-6 w-6 text-left" />
            <span className="flex-grow">Continue with Spotify</span>
          </div>
        </Button>
        <div className="flex items-center gap-4">
          <Separator className="w-32" />
          <span>or</span>
          <Separator className="w-32" />
        </div>
        <div className="w-full">
          <form
            className="space-y-8"
            method="post"
            action="/api/auth/signin/email"
          >
            <Input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <Label>
              Email address
              <Input
                className="mt-2 h-12"
                type="email"
                id="email"
                name="email"
                placeholder="email@example.com"
              />
            </Label>
            <Button type="submit" className="w-full py-6">
              Continue
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
