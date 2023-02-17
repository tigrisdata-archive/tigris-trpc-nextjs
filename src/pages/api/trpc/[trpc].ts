import * as trpcNext from '@trpc/server/adapters/next';
import { publicProcedure, router } from '~/server/trpc';
import { Cursor, FindQueryOptions, Order } from '@tigrisdata/core';
import { tigrisClient } from '~/utils/tigris';
import { z } from 'zod';
import Post from '~/db/models/post';
import User from '~/db/models/user';

const DEFAULT_PAGING_SIZE = 20;

const defaultUser: User = {
  id: "1",
  username: "leggetter",
};

const appRouter = router({
  post: publicProcedure
    .input(
      z.object({
        name: z.string(),
        text: z.string(),
      }),
    )
    .mutation(async ({ input }): Promise<Post> => {
      const posts = tigrisClient.getDatabase().getCollection<Post>(Post);
      const post = await posts.insertOne({ username: input.name, text: input.text })
      return post;
    }),

  getMessages: publicProcedure
    .input(
      z.object(
        {
          username: z.string().optional(),
          pageIndex: z.number()
        }
      )
    )
    .query(async ({ input }) => {
      const db = tigrisClient.getDatabase();
      const postsCollection = db.getCollection<Post>(Post);

      let cursor: Cursor<Post> | null = null

      if (input?.username) {
        cursor = postsCollection.findMany({
          filter: {
            username: input.username,
          },
          sort: { field: "createdAt", order: Order.DESC },
          options: new FindQueryOptions(DEFAULT_PAGING_SIZE, input.pageIndex * DEFAULT_PAGING_SIZE),
        });
      }
      else {
        cursor = postsCollection.findMany({
          sort: { field: "createdAt", order: Order.DESC },
          options: new FindQueryOptions(DEFAULT_PAGING_SIZE, 30),
        });
      }

      const results = await cursor.toArray();
      console.log(results[DEFAULT_PAGING_SIZE - 1])
      return results;
    }),

  getUser: publicProcedure
    .query(() => {
      return defaultUser;
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
