"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { api } from "~/trpc/react";
import { useCallback, useEffect, useRef } from "react";
import SongList from "~/components/song-list";
import { defaultSongColumns } from "~/lib/default-song-columns";
import { debounce } from "~/lib/utils";
import { Input } from "~/components/ui/input";
import { HiSearch } from "react-icons/hi";
import usePlayer from "~/app/_hooks/usePlayer";

function stringOrUndefined(str: unknown) {
  if (typeof str === "string") {
    return str;
  }
  return undefined;
}

export default function Search() {
  const { setSpaceBarEnabled } = usePlayer();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement>(null);
  const q = stringOrUndefined(searchParams.get("q"));
  const { data: songs, isFetching } = api.song.search.useQuery(q, {
    enabled: Boolean(q),
    keepPreviousData: Boolean(q),
  });

  // Focus the input element on component mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      const current = new URLSearchParams(Array.from(searchParams.entries()));

      if (!value) {
        current.delete("q");
      } else {
        current.set("q", value);
      }
      const search = current.toString();
      const query = search ? `?${search}` : "";

      window.history.pushState({}, "", `${pathname}${query}`);
    }, 300),
    [searchParams, pathname],
  );

  const message = isFetching
    ? "Searching..."
    : Boolean(q)
      ? `No results found for "${q}"`
      : "Search for Songs, Albums or Artists";

  return (
    <div className="flex h-full w-full flex-col items-center gap-5">
      <div className="relative w-1/2">
        <Input
          ref={inputRef}
          type="search"
          name="q"
          className="text-md h-12 rounded-full bg-background pl-10"
          defaultValue={q}
          onChange={(e) => debouncedSearch(e.target.value)}
          onFocus={() => setSpaceBarEnabled(false)}
          onBlur={() => setSpaceBarEnabled(true)}
        />
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <HiSearch className="h-5 w-5" />
        </div>
      </div>
      {songs?.length ? (
        <SongList columns={defaultSongColumns} songs={songs} />
      ) : (
        <div className="flex h-full flex-col items-center justify-center">
          <div>{message}</div>
        </div>
      )}
    </div>
  );
}
