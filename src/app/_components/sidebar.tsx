"use client";

import { cn } from "~/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { HiCollection } from "react-icons/hi";
import SidebarItem from "~/components/sidebar-item";
import { RiHomeLine, RiSearchLine } from "react-icons/ri";
import { HiOutlinePlay } from "react-icons/hi2";
import { AudioCtx } from "~/app/_providers/audio-provider";
import { useContext } from "react";

type SidebarProps = React.HTMLAttributes<HTMLDivElement>;

export function Sidebar({ className, children }: SidebarProps) {
  const { currentTitle } = useContext(AudioCtx);

  return (
    <div
      className={cn("bg-background flex h-full", className, {
        "h-[calc(100%-60px)]": !!currentTitle,
      })}
    >
      <div className="bg-background hidden w-[250px] flex-col gap-2.5 p-2.5 md:flex">
        <Card>
          <CardHeader>
            <CardTitle>StageBack</CardTitle>
          </CardHeader>
          <CardContent>
            <SidebarItem href="/" label="Home">
              <RiHomeLine size={18} />
            </SidebarItem>
            <SidebarItem href="/" label="Search">
              <RiSearchLine size={18} />
            </SidebarItem>
          </CardContent>
        </Card>
        <Card className="h-full overflow-y-auto">
          <CardHeader>
            <CardTitle>Music</CardTitle>
          </CardHeader>
          <CardContent>
            <SidebarItem href="/audio" label="Titles">
              <HiOutlinePlay size={18} />
            </SidebarItem>
            <SidebarItem href="/" label="Collection">
              <HiCollection size={18} />
            </SidebarItem>
          </CardContent>
        </Card>
      </div>
      <main className="flex h-full flex-1 p-2.5 pl-0">{children}</main>
    </div>
  );
}
