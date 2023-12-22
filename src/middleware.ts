import { withAuth } from "next-auth/middleware";
import { env } from "~/env.mjs";

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
    signIn: "/auth/signin",
    verifyRequest: "/auth/verify-request",
  },
});

export const config = {
  matcher: ["/((?!api|_next|_vercel|assets|auth/verify-request).*)*"],
};
