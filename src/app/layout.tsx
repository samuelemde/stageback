import "@uploadthing/react/styles.css";
import "~/styles/globals.css";

import { GeistMono, GeistSans } from "geist/font";
import { cookies } from "next/headers";
import { TRPCReactProvider } from "~/trpc/react";
import { Toaster } from "~/components/ui/toaster";
import { Sidebar } from "~/components/sidebar";
import AudioPlayer from "~/components/audio-player";
import AudioProvider from "./_providers/audio-provider";
import NextAuthProvider from "~/app/_providers/auth-provider";

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
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <TRPCReactProvider cookies={cookies().toString()}>
          <NextAuthProvider>
            <AudioProvider>
              <Sidebar>{children}</Sidebar>
              <AudioPlayer />
            </AudioProvider>
          </NextAuthProvider>
        </TRPCReactProvider>
        <Toaster />
      </body>
    </html>
  );
}
