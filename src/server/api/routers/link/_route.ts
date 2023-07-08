import { CreateLinkInputSchema, CreateManyLinkInputSchema, DeleteLinkSchema, GetLinkSchema, GetRelatedLinkSchema, GolinkSchema, InfiniteLinkListSchema, ListLinksSchema, UpdateLinkSchema } from "~/schema/Link.schema";
import { adminProcedure, createTRPCRouter, publicProcedure } from "../../trpc";
import createLinkHandler from "./createLinkHandler";
import { listLinkHandler } from "./listLinkHandler";
import updateLinkHandler from "./updateLinkHandler";
import deleteLinkHandler from "./deleteLinkHandler";
import getLinkHandler from "./getLinkHandler";
import goLinkHandler from "./goLinkHandler";
import { infinitLinkListHandler } from "./infiniteLinkListHandler";
import relatedLinkHandler from "./relatedLinks";
import { ServerErrorHandler } from "../../error-handler/ServerErrorHandler";
import slugify from "slugify";

export const LinkRouter = createTRPCRouter({
  create: adminProcedure.input(CreateLinkInputSchema).mutation(async ({ ctx, input }) => {
    return await createLinkHandler(input, { prisma: ctx.prisma });
  }),

  createMany: adminProcedure.input(CreateManyLinkInputSchema).mutation(async ({ctx, input}) => {
    try {
      if(input.links.length <= 0){
        return 0;
      }
      
      const alreadyExistsLinks = await ctx.prisma.link.findMany({
        where: {
          url:{
            in:  input.links.map(val => val.url)
          },
          collectionId: {
            in: input.links.map(val => val.collectionId)
          }
        }
      });

      const links = input.links.filter(l => {
        return alreadyExistsLinks.find(al => (al.url === l.url && al.collectionId === l.collectionId));
      });

      const re = await ctx.prisma.link.createMany({
        data: links.map(link => {
          return {
            ...link,
                collection: {
                    connect: { id: link.collectionId },
                },
                tags: {
                    connectOrCreate: link.tags?.map((tagName) => {
                        const slug = slugify(tagName);
                        return {
                            where: { slug },
                            create: { name: tagName, slug },
                        }
                    }),
                },
          }
        })
      });

      return re;
    } catch (error) {
      ServerErrorHandler(error)
    }
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
  }),

})