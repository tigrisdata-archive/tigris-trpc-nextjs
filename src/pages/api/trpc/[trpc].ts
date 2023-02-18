import * as trpcNext from '@trpc/server/adapters/next';
import { publicProcedure, router } from '~/server/trpc';
import { Cursor, FindQueryOptions, Order } from '@tigrisdata/core';
import { tigrisClient } from '~/utils/tigris';
import { z } from 'zod';
import Post from '~/db/models/post';
import User from '~/db/models/user';
import CONFIG from "~/config";

const defaultUser: User = {
  id: "1",
  username: "leggetter",
};

const postsCollection = tigrisClient.getDatabase().getCollection<Post>(Post);

const appRouter = router({
  post: publicProcedure
    .input(
      z.object({
        name: z.string(),
        text: z.string(),
      }),
    )
    .mutation(async ({ input }): Promise<Post> => {
      const post = await postsCollection.insertOne({ username: input.name, text: input.text })
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
      let cursor: Cursor<Post> | null = null

      if (input?.username) {
        cursor = postsCollection.findMany({
          filter: {
            username: input.username,
          },
          sort: { field: "createdAt", order: Order.DESC },
          options: new FindQueryOptions(CONFIG.DEFAULT_PAGING_SIZE, input.pageIndex * CONFIG.DEFAULT_PAGING_SIZE),
        });
      }
      else {
        cursor = postsCollection.findMany({
          sort: { field: "createdAt", order: Order.DESC },
          options: new FindQueryOptions(CONFIG.DEFAULT_PAGING_SIZE, input.pageIndex * CONFIG.DEFAULT_PAGING_SIZE),
        });
      }

      const results = await cursor.toArray();
      console.log(results[CONFIG.DEFAULT_PAGING_SIZE - 1])
      return results;
    }),

  searchMessages: publicProcedure
    .input(
      z.object({
        search: z.string(),
        pageIndex: z.number()
      })
    )
    .query(async ({ input }) => {
      const results = await postsCollection.search({
        q: input.search,
        sort: { field: "createdAt", order: Order.DESC },
        hitsPerPage: CONFIG.DEFAULT_PAGING_SIZE,
      }, input.pageIndex + 1);

      let posts: Post[] = results.hits.map(hit => hit.document);
      return posts;
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
