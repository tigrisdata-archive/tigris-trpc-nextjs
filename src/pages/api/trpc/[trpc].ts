import * as trpcNext from '@trpc/server/adapters/next';
import { publicProcedure, router } from '~/server/trpc';
import { type Cursor, FindQueryOptions, Order } from '@tigrisdata/core';
import { tigrisClient } from '~/utils/tigris';
import { z } from 'zod';
import Post from '~/db/models/post';
import User from '~/db/models/user';
import CONFIG from "~/config";

// Since we're not implementing signup/login
// default to using the first user returned
// from the collection of Users
let _defaultUser: User;
const getDefaultUser = async (): Promise<User> => {
  if (_defaultUser === undefined) {
    const usersCollection = tigrisClient.getDatabase().getCollection<User>(User);
    const user = await usersCollection.findOne();
    if (user === undefined) {
      throw new Error("A default user was expected to be founded.")
    }
    _defaultUser = user;
  }
  return _defaultUser;
}

const postsCollection = tigrisClient.getDatabase().getCollection<Post>(Post);

const appRouter = router({
  getMessages: publicProcedure
    .query(async () => {
      const cursor: Cursor<Post> = postsCollection.findMany({
        sort: { field: "createdAt", order: Order.DESC },
        options: new FindQueryOptions(CONFIG.DEFAULT_PAGING_SIZE, 0),
      });

      const results = await cursor.toArray();
      return results;
    }),

  getUser: publicProcedure
    .query(async () => {
      return await getDefaultUser();
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
