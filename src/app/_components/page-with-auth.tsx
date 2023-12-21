"use client";

import { type HTMLAttributes, useEffect, useState } from "react";
import { cn } from "~/lib/utils";
import { signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import Navigation from "~/components/navigation";
import { HiOutlineUser } from "react-icons/hi2";
import { api } from "~/trpc/react";
import { type Team } from ".prisma/client";

export default function PageWithAuth({
  children,
  className,
}: HTMLAttributes<HTMLDivElement>) {
  const utils = api.useUtils();
  const { data, update } = useSession();
  const [otherTeams, setOtherTeams] = useState<Team[]>([]);

  const activeTeamId = data?.user.activeTeamId;
  const { data: team } = api.team.getById.useQuery(activeTeamId!, {
    enabled: !!data,
  });
  const { data: teams } = api.team.getAllForUser.useQuery();
  const { mutate: updateActiveTeam } = api.user.updateActiveTeam.useMutation({
    onSuccess: () => {
      void update().then(() => {
        console.log("INVALIDATEE");
        void utils.song.invalidate();
        void utils.album.invalidate();
      });
    },
  });

  useEffect(() => {
    const filteredTeams = teams?.filter(
      (t) => t.id !== data?.user.activeTeamId,
    );
    setOtherTeams(filteredTeams ?? []);
  }, [teams, data?.user.activeTeamId]);

  return (
    <div
      className={cn(
        "flex w-full flex-col items-center overflow-auto rounded-md bg-card p-10 pt-4",
        className,
      )}
    >
      <div className="mb-4 flex w-full justify-between">
        <Navigation />
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger className="rounded-full" asChild>
              <div>
                <HiOutlineUser className="h-9 w-9 rounded-full border border-primary p-2 text-accent-foreground hover:scale-110 hover:bg-background" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-52" align="end">
              <DropdownMenuLabel>{team?.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {!!otherTeams.length && (
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Switch team</DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      {otherTeams.map((team) => (
                        <DropdownMenuItem
                          key={team.id}
                          onSelect={() => {
                            void updateActiveTeam(team.id);
                          }}
                        >
                          {team.name}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              )}
              <DropdownMenuItem onSelect={() => signOut()}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {children}
    </div>
  );
}
