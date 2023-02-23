import * as trpcNext from '@trpc/server/adapters/next';
import { publicProcedure, router } from '~/server/trpc';
import { z } from 'zod';
import CONFIG from "~/config";

import { type Cursor, FindQueryOptions, Order, Tigris } from "@tigrisdata/core";
import User from '~/db/models/user';
import Post from '~/db/models/post';

const tigrisClient = new Tigris();
const postsCollection = tigrisClient.getDatabase().getCollection<Post>(Post);

const appRouter = router({
  getUser: publicProcedure
    .query(async () => {
      const usersCollection = tigrisClient.getDatabase().getCollection<User>(User);
      const user = await usersCollection.findOne();
      return user;
    }),

  getMessages: publicProcedure
    .query(async () => {
      const cursor: Cursor<Post> = postsCollection.findMany({
        sort: { field: "createdAt", order: Order.DESC },
        options: new FindQueryOptions(CONFIG.DEFAULT_PAGING_SIZE, 0),
      });

      const results = await cursor.toArray();
      return results;
    }),
});

// export only the type definition of the API
// None of the actual implementation is exposed to the client
export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
});
