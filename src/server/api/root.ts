import { herrkosRouter } from "~/server/api/routers/example";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  herrkos: herrkosRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
