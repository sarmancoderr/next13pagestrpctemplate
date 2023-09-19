import * as bcrypt from 'bcrypt';
import { createPool } from 'mysql';
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

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
    .mutation(async ({input}) => {
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
      console.log(match, input.password, user.password)
      return {
        token: '',
        success: true
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