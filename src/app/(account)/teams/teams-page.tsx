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

export default function TeamsPage({
  initialTeams,
}: {
  initialTeams: RouterOutputs["team"]["getAllForUser"];
}) {
  const { data: teams } = api.team.getAllForUser.useQuery(undefined, {
    initialData: initialTeams,
  });
  const { update } = useSession();
  const router = useRouter();

  if (teams.length > 0) {
    return (
      <div className="flex flex-col gap-10 p-8">
        <h1 className="text-3xl font-bold">Select your team</h1>
        <Select
          onValueChange={(id) => {
            void update({ activeTeamId: id });
            void router.push("/");
          }}
        >
          <SelectTrigger className="w-full">
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
      </div>
    );
  }

  return <TeamCreationForm />;
}
