import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { cookies } from "next/headers";
import { TRPCReactProvider } from "~/trpc/react";
import AudioPlayer from "~/components/audio-player";
import NextAuthProvider from "~/app/_providers/auth-provider";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { fileRouter } from "~/app/api/uploadthing/core";

export const metadata = {
  title: "StageBack",
  description: "The home for all your files",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable}`}>
        <TRPCReactProvider cookies={cookies().toString()}>
          <NextAuthProvider>
            <NextSSRPlugin routerConfig={extractRouterConfig(fileRouter)} />
            {children}
            <AudioPlayer />
          </NextAuthProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
