import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { SongUncheckedCreateInputSchema } from "../../../../prisma/generated/zod";

export const songRouter = createTRPCRouter({
  create: protectedProcedure
    .input(SongUncheckedCreateInputSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.song.create({
        data: {
          ...input,
          uploadedById: ctx.session.user.id,
        },
      });
    }),

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.song.findMany({
      where: { teamId: ctx.session.activeTeam.id },
      include: { album: true },
    });
  }),

  getAllMasters: protectedProcedure.query(({ ctx }) => {
    return ctx.db.song.findMany({
      where: { teamId: ctx.session.activeTeam.id, versionOfId: null },
      include: { album: true },
    });
  }),

  getById: protectedProcedure.input(z.bigint()).query(({ ctx, input }) => {
    return ctx.db.song.findUnique({
      where: { id: input },
      include: {
        artwork: true,
        album: true,
        versions: true,
        uploadedBy: true,
        versionOf: true,
      },
    });
  }),
});