"use client";

import { type HTMLAttributes } from "react";
import { cn } from "~/lib/utils";
import { signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import Navigation from "~/components/navigation";
import { HiOutlineUser } from "react-icons/hi2";

export default function PageWithAuth({
  children,
  className,
}: HTMLAttributes<HTMLDivElement>) {
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
            <DropdownMenuTrigger className="rounded-full">
              <HiOutlineUser className="h-9 w-9 rounded-full border border-primary p-2 text-accent-foreground hover:scale-110 hover:bg-background" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
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
