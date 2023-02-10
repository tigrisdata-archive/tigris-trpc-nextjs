/**
 * This is the API-handler of your app that contains all your API routes.
 * On a bigger app, you will probably want to split this file up into multiple files.
 */
import * as trpcNext from '@trpc/server/adapters/next';
import { z } from 'zod';
import Post from '~/db/models/post';
import { publicProcedure, router } from '~/server/trpc';
import { tigrisClient } from '~/utils/tigris';

interface Message {
  id: number;
  message: string;
}

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
      const post = await posts.insertOne({ name: input.name, text: input.text })
      return post;
    }),

  like: publicProcedure
    .input(
      z.object({
        id: z.bigint(),
      }),
    )
    .query(({ input }) => {
      return input;
    }),

  getMessages: publicProcedure
    .query(async () => {
      const postsCollection = tigrisClient.getDatabase().getCollection<Post>(Post);
      const cursor = postsCollection.findMany();
      const posts = await cursor.toArray();
      return posts.sort((a, b) => {
        const result = (new Date(b.createdAt!)).getTime() - (new Date(a.createdAt!)).getTime();
        return result;
      });
    }),
  // 💡 Tip: Try adding a new procedure here and see if you can use it in the client!
  getUser: publicProcedure.query(() => {
    return { id: '1', name: '@leggetter' };
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
