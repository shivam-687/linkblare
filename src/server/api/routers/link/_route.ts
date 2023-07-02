import { CreateLinkInputSchema, DeleteLinkSchema, GetLinkSchema, GetRelatedLinkSchema, GolinkSchema, InfiniteLinkListSchema, ListLinksSchema, UpdateLinkSchema } from "~/schema/Link.schema";
import { adminProcedure, createTRPCRouter, publicProcedure } from "../../trpc";
import createLinkHandler from "./createLinkHandler";
import { listLinkHandler } from "./listLinkHandler";
import updateLinkHandler from "./updateLinkHandler";
import deleteLinkHandler from "./deleteLinkHandler";
import getLinkHandler from "./getLinkHandler";
import goLinkHandler from "./goLinkHandler";
import { infinitLinkListHandler } from "./infiniteLinkListHandler";
import relatedLinkHandler from "./relatedLinks";

export const LinkRouter = createTRPCRouter({
  create: adminProcedure.input(CreateLinkInputSchema).mutation(async ({ ctx, input }) => {
    return await createLinkHandler(input, { prisma: ctx.prisma });
  }),

  list: publicProcedure.input(ListLinksSchema).query(async ({ ctx, input }) => {
    return await listLinkHandler(input, { ...ctx });
  }),

  update: adminProcedure.input(UpdateLinkSchema).mutation(async ({ ctx, input }) => {
    return await updateLinkHandler(input, { ...ctx });
  }),
  delete: adminProcedure.input(DeleteLinkSchema).mutation(async ({ ctx, input }) => {
    return await deleteLinkHandler(input, { ...ctx });
  }),

  get: publicProcedure.input(GetLinkSchema).query(async ({ ctx, input }) => {
    return await getLinkHandler(input, { ...ctx });
  }),

  go: publicProcedure.input(GolinkSchema).query(async ({ ctx, input }) => {
    return await goLinkHandler(input, { ...ctx });
  }),
  infinitList: publicProcedure.input(InfiniteLinkListSchema).query(async ({ ctx, input }) => {
    return await infinitLinkListHandler(input, { ...ctx });
  }),
  relatedLinks: publicProcedure.input(GetRelatedLinkSchema).query(async ({ ctx, input }) => {
    return await relatedLinkHandler(input, { ...ctx });
  })
})