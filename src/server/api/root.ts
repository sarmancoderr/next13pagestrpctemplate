import { createTRPCRouter } from "~/server/api/trpc";
import { privateRouter } from "./routers/private";
import { publicRouter } from "./routers/public";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  main: publicRouter,
  private: privateRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
