import { initTRPC } from "@trpc/server";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import cookie from 'cookie';
import superjson from "superjson";
import { ZodError } from "zod";
import { validateToken } from "~/utils/jwt";

export const createTRPCContext = ({req, res}: CreateNextContextOptions) => {
  const cookies = cookie.parse(req.headers.cookie ?? '')
  const authToken = cookies.token
  console.log(authToken)

  return {
    isAuthed: validateToken(authToken ?? ''),
    setToken(token: string) {
      console.log('ESTABLECIENDO TOKEN', token)
      res.appendHeader('Set-Cookie', cookie.serialize('token', token))
    },
    token: authToken
  };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createTRPCRouter = t.router;

const middleware = t.middleware(async ({next, ctx}) => {
  if (!ctx.isAuthed) {
    throw new Error('No estas autenticado')
  }
  return next()
})

export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(middleware)