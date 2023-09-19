import * as bcrypt from 'bcrypt';
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { encode } from '~/utils/jwt';
import queryPromised from '~/utils/pool';

export const publicRouter = createTRPCRouter({
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
      console.log('antes de encodear')
      const token = encode(user)
      
      ctx.setToken(token)
      console.log('antes de retuornar')
      
      return {
        token,
        success: true
      }
    })
});

