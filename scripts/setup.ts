import { Tigris } from "@tigrisdata/core";
import Post from "../src/db/models/post";
import User from "../src/db/models/user";

import { loadEnvConfig } from "@next/env";
loadEnvConfig(process.cwd(), process.env.NODE_ENV !== "production")

async function main(): Promise<void> {
  const tigrisClient = new Tigris();

  // ensure branch exists, create it if it needs to be created dynamically
  await tigrisClient.getDatabase().initializeBranch();
  // register schemas
  await tigrisClient.registerSchemas([User, Post]);
}

main()
  .then(async () => {
    console.log("Setup complete ...");
    process.exit(0);
  })
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  });
