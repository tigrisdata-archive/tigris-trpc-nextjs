import * as trpcNext from '@trpc/server/adapters/next';
import { publicProcedure, router } from '~/server/trpc';
import { tigrisClient } from '~/utils/tigris';
import { z } from 'zod';
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

const appRouter = router({
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
