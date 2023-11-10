import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";
import { type Readable } from "node:stream";
import * as mm from "music-metadata/lib/core";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatSongTitle(title: string) {
  return title.slice(0, title.lastIndexOf("."));
}

export async function getMetadata(url: string, size: number) {
  const response = await axios<Readable>({
    method: "get",
    url: url,
    responseType: "stream",
  });

  return await mm.parseStream(
    response.data,
    {
      mimeType: "audio/mpeg",
      size,
    },
    { duration: true },
  );
}

export function formatDuration(duration: number) {
  const min = Math.floor(duration / 60);
  const sec = Math.floor(duration - min * 60);
  return `${min}:${sec < 10 ? "0" + sec : sec}`;
}
