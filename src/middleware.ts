import { withAuth } from "next-auth/middleware";
import { env } from "~/env.mjs";

export default withAuth({
  callbacks: {
    authorized: ({ req: { cookies } }) => {
      const cookieName =
        env.NODE_ENV === "production"
          ? "__Secure-next-auth.session-token"
          : "next-auth.session-token";
      const sessionToken = cookies.get(cookieName);
      return sessionToken != null;
    },
  },
  pages: {
    signIn: "/auth/signin", // override signin page
  },
});

export const config = { matcher: ["/((?!api|_next|_vercel|assets).*)*"] };
