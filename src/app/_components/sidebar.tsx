"use client";

import { cn } from "~/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { HiCollection } from "react-icons/hi";
import SidebarItem from "~/components/sidebar-item";
import { RiHomeLine, RiSearchLine } from "react-icons/ri";
import { HiMusicalNote, HiQueueList } from "react-icons/hi2";
import usePlayer from "~/app/_hooks/usePlayer";
import { Toaster } from "~/components/ui/toaster";
import React from "react";

type SidebarProps = React.HTMLAttributes<HTMLDivElement>;

export function Sidebar({ className, children }: SidebarProps) {
  const { activeSong } = usePlayer();

  return (
    <div
      className={cn("flex h-full bg-background", className, {
        "h-[calc(100%-60px)]": !!activeSong,
      })}
    >
      <div className="hidden w-[250px] shrink-0 flex-col gap-2.5 bg-background p-2.5 md:flex">
        <Card>
          <CardHeader>
            <CardTitle>StageBack</CardTitle>
          </CardHeader>
          <CardContent>
            <SidebarItem href="/" label="Home">
              <RiHomeLine size={18} />
            </SidebarItem>
            <SidebarItem href="/search" label="Search">
              <RiSearchLine size={18} />
            </SidebarItem>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Audio</CardTitle>
          </CardHeader>
          <CardContent>
            <SidebarItem href="/songs" label="Songs">
              <HiMusicalNote size={18} />
            </SidebarItem>
            <SidebarItem href="/albums" label="Albums">
              <HiCollection size={18} />
            </SidebarItem>
            {/*<SidebarItem href="/coming-soon" label="Collections">*/}
            {/*  <HiQueueList size={18} />*/}
            {/*</SidebarItem>*/}
          </CardContent>
        </Card>
        {/*<Card>*/}
        {/*  <CardHeader>*/}
        {/*    <CardTitle>Visuals</CardTitle>*/}
        {/*  </CardHeader>*/}
        {/*  <CardContent>*/}
        {/*    <SidebarItem href="/coming-soon" label="Photos">*/}
        {/*      <HiOutlineCamera size={18} />*/}
        {/*    </SidebarItem>*/}
        {/*    <SidebarItem href="/coming-soon" label="Videos">*/}
        {/*      <HiOutlineVideoCamera size={18} />*/}
        {/*    </SidebarItem>*/}
        {/*  </CardContent>*/}
        {/*</Card>*/}
        <Card className="h-full overflow-y-auto">
          <CardHeader>
            <CardTitle>Playlists</CardTitle>
          </CardHeader>
          <CardContent>
            {/*<SidebarItem href="/coming-soon" label="Coming soon..">*/}
            {/*  <HiDocumentDuplicate size={18} />*/}
            {/*</SidebarItem>*/}
            <SidebarItem href="/coming-soon" label="Coming soon">
              <HiQueueList size={18} />
            </SidebarItem>
          </CardContent>
        </Card>
      </div>
      <main className="flex h-full flex-1 p-2.5 pl-0">{children}</main>
      <Toaster />
    </div>
  );
}
