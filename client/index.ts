import { createTRPCClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../server";

// Pass AppRouter as generic here. 👇 This lets the `trpc` object know
// what procedures are available on the server and their input/output types.
const trpc = createTRPCClient<AppRouter>({
    links: [
        httpBatchLink({
            url: "http://localhost:3000"
        })
    ]
})

async function main() {
    await trpc.userCreate.mutate({ name: 'gitaoh' })
    const user = await trpc.userById.query("1")
    const users = await trpc.userList.query()
    console.log({ user });
    console.log({users});    
}

main()
