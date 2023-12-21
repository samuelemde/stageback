import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { AlbumCreateInputSchema } from "../../../../prisma/generated/zod";

export const albumRouter = createTRPCRouter({
  create: protectedProcedure
    .input(AlbumCreateInputSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.album.create({
        data: input,
      });
    }),

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.album.findMany({
      where: { songs: { some: { teamId: ctx.session.user.activeTeamId } } },
      orderBy: [{ year: "desc" }, { name: "asc" }],
    });
  }),

  getById: protectedProcedure.input(z.string()).query(({ ctx, input: id }) => {
    return ctx.db.album.findUnique({
      where: { id },
    });
  }),
});
