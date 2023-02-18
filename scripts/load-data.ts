import * as fs from "node:fs/promises"

import { loadEnvConfig } from "@next/env";
loadEnvConfig(process.cwd(), process.env.NODE_ENV !== "production")

import { tigrisClient } from "../src/utils/tigris"
import Post from "../src/db/models/post";
import path from "node:path";

const BATCH_SIZE = 200;
const USERNAMES = ["leggetter", "ovaistariq", "adilansari", "GarrenSmith"];

async function main() {
  const mockFilesDir = path.join(__dirname, "..", "mock-data");
  const mockFiles = await fs.readdir(mockFilesDir);
  const postCollection = tigrisClient.getDatabase().getCollection<Post>(Post);
  for (let i = 0; i < mockFiles.length; ++i) {
    console.log(`Reading mock file ${i + 1} of ${mockFiles.length}`);
    let json = await fs.readFile(path.join(mockFilesDir, mockFiles[i]), "utf-8");

    let posts: Post[] = JSON.parse(json);
    posts = posts.map((post) => {
      post.username = USERNAMES[Math.floor(Math.random() * USERNAMES.length)];
      return post;
    })
    while (posts.length > 0) {
      const insert = posts.splice(0, BATCH_SIZE);
      await postCollection.insertMany(insert);
    }
  }
}

main()
  .then(async () => {
    console.log("Loading data complete ...");
    process.exit(0);
  })
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  });