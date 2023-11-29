import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const albumRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.album.findMany({
      where: { songs: { some: { teamId: ctx.session.activeTeam.id } } },
      include: { songs: { where: { teamId: ctx.session.activeTeam.id } } },
    });
  }),

  getById: protectedProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.db.album.findUnique({
      where: { id: input },
      include: {
        songs: { where: { teamId: ctx.session.activeTeam.id } },
      },
    });
  }),
});
