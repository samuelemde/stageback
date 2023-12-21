import { api } from "~/trpc/server";
import TeamsPage from "~/app/(account)/teams/teams-page";
import { redirect } from "next/navigation";

export default async function Page() {
  const teams = await api.team.getAllForUser.query();

  if (teams.length === 1) {
    redirect("/");
  }

  return (
    <div className="flex flex-col items-center overflow-auto rounded-md bg-card p-10 pt-4">
      <TeamsPage initialTeams={teams} />
    </div>
  );
}
