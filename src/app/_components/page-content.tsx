import { type HTMLAttributes } from "react";
import { cn } from "~/lib/utils";

export default function PageContent({
  children,
  className,
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "bg-card flex w-full flex-col items-center overflow-auto rounded-md p-10",
        className,
      )}
    >
      {children}
    </div>
  );
}
