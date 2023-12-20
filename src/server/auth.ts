import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import SpotifyProvider from "next-auth/providers/spotify";
import EmailProvider from "next-auth/providers/email";

import { env } from "~/env.mjs";
import { db } from "~/server/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type Team } from ".prisma/client";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      teams: Team[];
    } & DefaultSession["user"];
    activeTeam: Team;
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: async ({ session, user }) => {
      const userTeams = await db.user.findUnique({
        where: { id: user.id },
        select: {
          teams: true, // Assuming a relation is set up in Prisma schema
        },
      });
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          teams: userTeams?.teams ?? [],
        },
        activeTeam: userTeams?.teams[0] ?? null,
      };
    },
  },
  adapter: PrismaAdapter(db),
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    SpotifyProvider({
      clientId: env.SPOTIFY_CLIENT_ID,
      clientSecret: env.SPOTIFY_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  theme: {
    colorScheme: "dark", // "auto" | "dark" | "light"
    brandColor: "#dd524c", // Hex color code
    // logo: "", // Absolute URL to image
    buttonText: "#f8f8f8", // Hex color code
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
