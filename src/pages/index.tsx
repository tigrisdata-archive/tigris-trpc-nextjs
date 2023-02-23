import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { Layout } from "~/components/layout";
import { Loading } from "~/components/loading";

import { trpc } from "../utils/trpc";
import type Post from "~/db/models/post";
import PostsList from "~/components/posts-list";

export default function IndexPage(): JSX.Element {
  const userPayload = trpc.getUser.useQuery();
  const queryPosts = trpc.getMessages.useQuery();

  const [posts, setPosts] = useState<Post[]>([]);

  if (userPayload.data === undefined) {
    return <Loading />;
  }

  const user = userPayload.data as { username: string };

  useEffect(() => {
    if (queryPosts.status === "success") {
      setPosts(queryPosts.data as Post[]);
    }
  }, [queryPosts.data]);

  return (
    <Layout username={user.username}>
      <Typography variant="h4" component="h2" mb={5}>
        Welcome, {user.username}
      </Typography>

      {queryPosts.status === "loading" && <Loading />}

      {queryPosts.status === "success" && <PostsList posts={posts} />}
    </Layout>
  );
}
