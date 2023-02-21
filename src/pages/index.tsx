import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Layout } from "~/components/layout";
import { Loading } from "~/components/loading";
import PostsList from "~/components/posts-list";

import type Post from "~/db/models/post";
import type User from "~/db/models/user";
import { trpc } from "../utils/trpc";

export default function IndexPage(): JSX.Element {
  const userPayload = trpc.getUser.useQuery();
  const user = userPayload.data as User;
  const queryPosts = trpc.getMessages.useQuery();

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (queryPosts.isSuccess) {
      setPosts(queryPosts.data as Post[]);
    }
  }, [queryPosts.data]);

  if (userPayload.data === undefined) {
    return <Loading />;
  }

  return (
    <Layout user={user}>
      <Typography variant="h4" component="h2" mb={5}>
        Welcome, {user.username}
      </Typography>

      {queryPosts.status === "loading" && <Loading />}

      {queryPosts.status === "success" && <PostsList posts={posts} />}
    </Layout>
  );
}
