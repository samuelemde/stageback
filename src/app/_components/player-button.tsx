import React from "react";
import { cn } from "~/lib/utils";
import { Button, type ButtonProps } from "~/components/ui/button";

export default function PlayerButton({ className, ...props }: ButtonProps) {
  return (
    <Button
      className={cn(
        "text-accent-foreground items-center justify-center rounded-full bg-transparent hover:scale-105 focus:outline-none disabled:opacity-60",
        className,
      )}
      {...props}
    />
  );
}
