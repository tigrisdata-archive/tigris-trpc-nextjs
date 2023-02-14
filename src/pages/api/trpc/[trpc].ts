/**
 * This is the API-handler of your app that contains all your API routes.
 * On a bigger app, you will probably want to split this file up into multiple files.
 */
import { Cursor, Order } from '@tigrisdata/core';
import * as trpcNext from '@trpc/server/adapters/next';
import { z } from 'zod';
import Post from '~/db/models/post';
import User from '~/db/models/user';
import { publicProcedure, router } from '~/server/trpc';
import { tigrisClient } from '~/utils/tigris';

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

  // like: publicProcedure
  //   .input(
  //     z.object({
  //       id: z.bigint(),
  //     }),
  //   )
  //   .query(({ input }) => {
  //     return input;
  //   }),

  getMessages: publicProcedure
    .input(
      z.object(
        {
          username: z.string().optional()
        }
      ).optional()
    )
    .query(async ({ input }) => {
      const postsCollection = tigrisClient.getDatabase().getCollection<Post>(Post);

      let cursor: Cursor<Post> | null = null

      if (input?.username) {
        cursor = postsCollection.findMany({
          filter: {
            username: input.username,
          },
          sort: { field: "createdAt", order: Order.DESC }
        });
      }
      else {
        cursor = postsCollection.findMany({
          sort: { field: "createdAt", order: Order.DESC }
        });
      }
      return await cursor.toArray();
    }),
  // 💡 Tip: Try adding a new procedure here and see if you can use it in the client!
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
