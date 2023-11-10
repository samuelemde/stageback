import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { TitleUncheckedCreateInputSchema } from "../../../../prisma/generated/zod";

export const titleRouter = createTRPCRouter({
  create: protectedProcedure
    .input(TitleUncheckedCreateInputSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.title.create({
        data: {
          ...input,
          uploadedById: ctx.session.user.id,
        },
      });
    }),

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.title.findMany({
      where: { uploadedById: ctx.session.user.id },
    });
  }),

  getById: protectedProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.db.title.findUnique({
      where: { id: input },
    });
  }),

  getPublic: publicProcedure.query(({ ctx }) => {
    return ctx.db.title.findMany();
  }),
});
