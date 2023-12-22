"use client";

import { type RouterOutputs } from "~/trpc/shared";
import { Button } from "~/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { api } from "~/trpc/react";
import { useSession } from "next-auth/react";

export default function InvitationRedemption({
  invitation,
}: {
  invitation: NonNullable<RouterOutputs["invitation"]["getById"]>;
}) {
  const router = useRouter();
  const { update } = useSession();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const { mutate: redeemInvitation } = api.invitation.redeem.useMutation({
    onSuccess: () => {
      void update().then(() => void router.push(callbackUrl ?? "/"));
    },
  });

  return (
    <>
      <p>
        <span className="font-bold">
          {invitation.invitedBy.name ?? invitation.invitedBy.email}
        </span>{" "}
        has invited you to join his team
      </p>
      <Button
        className="w-full py-6"
        onClick={() => redeemInvitation(invitation.id)}
      >
        Join {invitation.team.name}
      </Button>
    </>
  );
}
