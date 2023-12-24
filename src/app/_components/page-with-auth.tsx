import { type HTMLAttributes, Suspense } from "react";
import { cn } from "~/lib/utils";
import dynamic from "next/dynamic";

const ProfileDropdown = dynamic(() => import("~/components/profile-dropdown"));
const Navigation = dynamic(() => import("~/components/navigation"));

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
        <Suspense>
          <Navigation />
          <ProfileDropdown />
        </Suspense>
      </div>
      {children}
    </div>
  );
}
