import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  updateActiveTeam: protectedProcedure
    .input(z.string())
    .mutation(({ input: teamId, ctx }) => {
      return ctx.db.user.update({
        where: { id: ctx.session.user.id },
        data: { activeTeamId: teamId },
      });
    }),
});
