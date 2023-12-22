"use client";

import { type HTMLAttributes } from "react";
import { cn } from "~/lib/utils";

export default function CardPage({
  children,
  className,
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center bg-background",
        className,
      )}
    >
      <div className="flex min-w-80 flex-col items-center gap-10 overflow-auto rounded-md bg-card p-12 pb-14">
        {children}
      </div>
    </div>
  );
}
