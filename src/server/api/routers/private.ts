import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

export const privateRouter = createTRPCRouter({
    privateDate: privateProcedure.query(() => {
      return {
        msg: 'Datos privados'
      }
    })
});
