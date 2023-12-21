import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const teamRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.team.create({
        data: {
          ...input,
          createdById: ctx.session.user.id,
          members: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  getAllForUser: protectedProcedure.query(({ ctx }) => {
    return ctx.db.team.findMany({
      where: { members: { some: { id: ctx.session.user.id } } },
    });
  }),
});
