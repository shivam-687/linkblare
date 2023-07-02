import { createTRPCRouter } from "~/server/api/trpc";
import { exampleRouter } from "~/server/api/routers/example";
import { CollectionRouter } from "./routers/collection/collection";
import { LinkRouter } from "./routers/link/_route";
import { SaveRouter } from "./routers/saved";
import { SearchRouter } from "./routers/search";
import { TagRouter } from "./routers/tag";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  collection: CollectionRouter,
  link: LinkRouter,
  save: SaveRouter,
  search: SearchRouter,
  tag: TagRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
