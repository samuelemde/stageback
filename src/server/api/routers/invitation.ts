import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const invitationRouter = createTRPCRouter({
  redeem: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input: id }) => {
      const invitation = await ctx.db.invitation.findUnique({
        where: { id },
      });
      if (!invitation) {
        throw new Error("Invitation not found");
      }
      if (invitation.redeemedById) {
        throw new Error("Invitation already redeemed");
      }
      await ctx.db.user.update({
        where: { id: ctx.session.user.id },
        data: {
          teams: { connect: { id: invitation.teamId } },
          activeTeamId: invitation.teamId,
        },
      });
      return ctx.db.invitation.update({
        where: { id },
        data: { redeemedById: ctx.session.user.id },
      });
    }),

  getById: protectedProcedure.input(z.string()).query(({ ctx, input: id }) => {
    return ctx.db.invitation.findUnique({
      where: { id },
      include: { invitedBy: true, team: true },
    });
  }),
});
