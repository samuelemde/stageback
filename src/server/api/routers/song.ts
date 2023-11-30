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
      orderBy: { title: "asc" },
    });
  }),

  getMainVersions: protectedProcedure.query(({ ctx }) => {
    return ctx.db.song.findMany({
      where: { teamId: ctx.session.activeTeam.id, versionOfId: null },
      include: { album: true },
      orderBy: { title: "asc" },
    });
  }),

  getById: protectedProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.db.song.findUnique({
      where: { id: input },
      include: {
        album: true,
        versionOf: true,
        versions: { orderBy: { title: "asc" } },
      },
    });
  }),

  connectVersion: protectedProcedure
    .input(z.object({ id: z.string(), versionOfId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const subVersions = await ctx.db.song.findMany({
        where: { versionOfId: input.id },
      });
      const ids = [input.id, ...subVersions.map((v) => v.id)];
      return ctx.db.song.updateMany({
        where: { id: { in: ids } },
        data: { versionOfId: input.versionOfId },
      });
    }),
});
