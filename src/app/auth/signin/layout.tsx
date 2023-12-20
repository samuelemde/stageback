import "@uploadthing/react/styles.css";
import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { cookies } from "next/headers";
import { TRPCReactProvider } from "~/trpc/react";
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
      <body className={`font-sans ${GeistSans.variable}`}>
        <TRPCReactProvider cookies={cookies().toString()}>
          <NextAuthProvider>{children}</NextAuthProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}