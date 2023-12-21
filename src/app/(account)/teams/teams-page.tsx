"use client";

import type { RouterOutputs } from "~/trpc/shared";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { TeamCreationForm } from "~/components/team-creation-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { ImSpinner2 } from "react-icons/im";

export default function TeamsPage({
  initialTeams,
}: {
  initialTeams: RouterOutputs["team"]["getAllForUser"];
}) {
  const utils = api.useUtils();
  const { data: teams } = api.team.getAllForUser.useQuery(undefined, {
    initialData: initialTeams,
  });

  const { mutate: updateActiveTeam, isIdle } =
    api.user.updateActiveTeam.useMutation({
      onSuccess: () => {
        void update().then(() => {
          void utils.song.invalidate();
          void utils.album.invalidate();
          void router.push("/");
        });
      },
    });
  const { update } = useSession();
  const router = useRouter();

  if (teams.length > 0) {
    return (
      <div className="flex flex-col gap-10 p-8">
        <h1 className="text-3xl font-bold text-accent-foreground">
          Select your team
        </h1>
        {!isIdle ? (
          <div className="flex justify-center">
            <ImSpinner2 className="h-12 w-12 animate-spin p-1" />
          </div>
        ) : (
          <Select
            onValueChange={(id) => {
              updateActiveTeam(id);
            }}
          >
            <SelectTrigger className="text-md h-12 w-full border-accent">
              <SelectValue placeholder="Teams" />
            </SelectTrigger>
            <SelectContent>
              {teams.map((team) => (
                <SelectItem key={team.id} value={team.id}>
                  {team.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
    );
  }

  return <TeamCreationForm />;
}
