import { useEffect, useState } from "react";

import { useRouter } from "next/router";
import { trpc } from "../utils/trpc";

import Post from "~/db/models/post";
import User from "~/db/models/user";

import { Container, Typography } from "@mui/material";

import { Layout } from "~/components/layout";
import PostsList from "~/components/posts-list";
import { Loading } from "~/components/loading";
import { BottomNav } from "~/components/bottom-nav";

export default function IndexPage() {
  const router = useRouter();
  const userPayload = trpc.getUser.useQuery();

  const [pageIndex, setPageIndex] = useState<number>(0);
  const [posts, setPosts] = useState<Post[]>([]);

  if (!userPayload) {
    return (
      <Container>
        <h1>404</h1>
      </Container>
    );
  }
  const user: User = userPayload.data as User;
  const username = router.query.username as string;
  const queryPosts = trpc.getMessages.useQuery({
    username,
    pageIndex,
  });

  const handlePostsNavigation = (toIndex: number) => {
    setPageIndex(toIndex);
  };

  useEffect(() => {
    setPosts(queryPosts.data as Post[]);
  }, [queryPosts.data, pageIndex]);

  if (!userPayload.data || !posts) {
    return <Loading />;
  }

  return (
    <Layout user={user}>
      <PostsList posts={posts} />
      <BottomNav
        pageIndex={pageIndex}
        handlePostsNavigation={handlePostsNavigation}
      />
    </Layout>
  );
}
