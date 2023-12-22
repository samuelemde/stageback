import { songRouter } from "~/server/api/routers/song";
import { createTRPCRouter } from "~/server/api/trpc";
import { albumRouter } from "~/server/api/routers/album";
import { teamRouter } from "~/server/api/routers/team";
import { userRouter } from "~/server/api/routers/user";
import { invitationRouter } from "~/server/api/routers/invitation";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  song: songRouter,
  album: albumRouter,
  team: teamRouter,
  user: userRouter,
  invitation: invitationRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
