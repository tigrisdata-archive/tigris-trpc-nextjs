import { loadEnvConfig } from "@next/env";
loadEnvConfig(process.cwd(), process.env.NODE_ENV !== "production")

import { tigrisClient } from "../src/utils/tigris"
import User from "../src/db/models/user";

async function main(usernames: string[]) {
  if (!usernames.every(x => x.length >= 4)) {
    throw new Error('Usernames must be 4 or more characters long');
  }

  console.log(`Inserting users with usernames: ${usernames.join(", ")}`);
  const users: User[] = usernames.map(username => { return { username } });
  const usersCollection = tigrisClient.getDatabase().getCollection<User>(User);
  await usersCollection.insertMany(users);
  console.log("Users inserted.");
}

main(process.argv.slice(2));