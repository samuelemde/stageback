import { api } from "~/trpc/server";
import { redirect } from "next/navigation";
import TeamSelection from "~/components/team-selection";
import { TeamCreationForm } from "~/components/team-creation-form";

export default async function Page({
  searchParams,
}: {
  searchParams: { callbackUrl?: string };
}) {
  const teams = await api.team.getAllForUser.query();

  if (teams.length === 1) {
    redirect(searchParams.callbackUrl ?? "/");
  }

  if (teams.length > 0) {
    return <TeamSelection initialTeams={teams} />;
  }

  return <TeamCreationForm />;
}
