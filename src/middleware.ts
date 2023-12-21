import { withAuth } from "next-auth/middleware";
import { env } from "~/env.mjs";
import { getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";

export default withAuth({
  callbacks: {
    authorized: async ({ req }) => {
      const cookieName =
        env.NODE_ENV === "production"
          ? "__Secure-next-auth.session-token"
          : "next-auth.session-token";
      const sessionToken = req.cookies.get(cookieName);
      return !!sessionToken;
    },
  },
  pages: {
    signIn: "/auth/signin", // override signin page
  },
});

export const config = { matcher: ["/((?!api|_next|_vercel|assets).*)*"] };
