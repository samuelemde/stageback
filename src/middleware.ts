import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ req: { cookies } }) => {
      const sessionToken = cookies.get("next-auth.session-token");
      return sessionToken != null;
    },
  },
  pages: {
    signIn: "/auth/signin", // override signin page
  },
});

export const config = { matcher: ["/((?!api|_next|_vercel|assets).*)*"] };
