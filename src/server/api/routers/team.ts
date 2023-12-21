import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const teamRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const team = await ctx.db.team.create({
        data: {
          ...input,
          createdById: ctx.session.user.id,
          members: { connect: { id: ctx.session.user.id } },
        },
      });
      await ctx.db.user.update({
        where: { id: ctx.session.user.id },
        data: { activeTeamId: team.id },
      });
      return team;
    }),

  getById: protectedProcedure.input(z.string()).query(({ ctx, input: id }) => {
    return ctx.db.team.findUnique({
      where: { id },
    });
  }),

  getAllForUser: protectedProcedure.query(({ ctx }) => {
    return ctx.db.team.findMany({
      where: { members: { some: { id: ctx.session.user.id } } },
    });
  }),
});
