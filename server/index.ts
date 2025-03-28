import { createHTTPServer } from "@trpc/server/adapters/standalone"
import { publicProcedure, router } from "./trpc"
import { db } from "./db"
import { z } from "zod"

const appRouter = router({
    userList: publicProcedure.query(async () => {
        const users = await db.user.findMany()
        return users
    }),
    userById: publicProcedure.input(z.string()).query(async (options) => {
            const {input} = options
            const users = await db.user.findById(input)
            return users
        }),
        userCreate: publicProcedure.input(z.object({name: z.string()})).mutation(async (options) => {
            const { input } = options
            const user = await db.user.create(input)
            return user
        })
})

export type AppRouter = typeof appRouter
const server = createHTTPServer({
    router: appRouter
})
server.listen(3000, () => console.log("Running.."))
