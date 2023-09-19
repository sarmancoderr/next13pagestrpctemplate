import * as bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import { createPool } from 'mysql';
import { z } from "zod";
import { createTRPCRouter, privateProcedure, publicProcedure } from "~/server/api/trpc";

export const SECRET_KEY = 'sdkldslkmdsmkldsmklmkldsmklsd'

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  login: publicProcedure
    .input(z.object({login: z.string(), password: z.string()}))
    .mutation(async ({input, ctx}) => {
      if (ctx.isAuthed) {
        return {
          token: ctx.token,
          success: true
        }
      }
      const [user] = await queryPromised(
        `SELECT * FROM user WHERE login=? AND suspendido = ?`,
        [input.login, 0]
      )
      if (!user) {
        return {
          token: '',
          success: false
        }
      }
      const match = await bcrypt.compare(input.password, user.password)
      if (!match) {
        return {
          token: '',
          success: false
        }
      }
      const token = jsonwebtoken.sign({
        user: user.login
      }, SECRET_KEY, {})

      ctx.setToken(token)
      
      return {
        token,
        success: true
      }
    }),
    privateDate: privateProcedure.query(() => {
      return {
        msg: 'Datos privados'
      }
    })
});

const pool  = createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'root',
  password        : '',
  database        : 'prueba'
});

function queryPromised(query: string, args: unknown[]): Promise<any[]> {
  return new Promise((resolve, reject) => {
    pool.query(query, args, (err, result) => {
      if (err) {
        return reject(err)
      }
      resolve(JSON.parse(JSON.stringify(result)) as any[])
    })
  })
}