"use client";

import { Button } from "~/components/ui/button";
import { useRouter } from "next/navigation";

export default function InvitationFailure({ reason }: { reason: string }) {
  const router = useRouter();
  return (
    <>
      <div className="w-full rounded-md bg-primary/10 p-2 text-center text-sm text-primary">
        {reason}
      </div>
      <Button
        className="w-full py-6"
        onClick={() => void router.push("/teams")}
      >
        Continue
      </Button>
    </>
  );
}
