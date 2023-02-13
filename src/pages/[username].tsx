import { useEffect, useState } from "react";

import { useRouter } from "next/router";
import { trpc } from "../utils/trpc";

import Post from "~/db/models/post";
import User from "~/db/models/user";

import { Container, Typography } from "@mui/material";

import { Layout } from "~/components/layout";
import PostsList from "~/components/posts-list";

export default function IndexPage() {
  const router = useRouter();
  const userPayload = trpc.getUser.useQuery();

  if (!userPayload) {
    return (
      <Container>
        <h1>404</h1>
      </Container>
    );
  }
  const user: User = userPayload.data as User;
  const username = router.query.username as string;
  const queryPosts = trpc.getMessages.useQuery({ username });
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    setPosts(queryPosts.data as Post[]);
  }, queryPosts.data);

  if (!userPayload.data || !posts) {
    return (
      <Container>
        <h1>Loading...</h1>
      </Container>
    );
  }

  return (
    <Layout user={user}>
      <PostsList posts={posts} />
    </Layout>
  );
}
